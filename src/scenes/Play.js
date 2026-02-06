import Phaser from 'phaser';
import Bird from '../entities/Bird.js';
import { spawnPipePair } from '../entities/Obstacle.js';
import { createOceanBackground } from './oceanBackground.js';

const PIPE_WIDTH = 60;
const PIPE_SPEED = 200;
const SPAWN_INTERVAL = 2000;

export default class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Play' });
  }

  create() {
    const { width, height } = this.cameras.main;

    this.score = 0;
    this.gameOver = false;
    this.pipePairs = [];

    // Ocean background
    const { seabedFar, seabedNear } = createOceanBackground(this);
    this.seabedFar = seabedFar;
    this.seabedNear = seabedNear;

    // Bird
    this.bird = new Bird(this, width / 4, height / 2);
    this.bird.setDepth(0.8);

    // Input: tap or click to flap
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard?.on('keydown-SPACE', (e) => {
      e.preventDefault();
      this.flap();
    });

    // Score text
    this.scoreText = this.add.text(width / 2, 50, '0', {
      fontSize: '52px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffd36a',
      stroke: '#0b1f3b',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#0b1f3b', blur: 0, fill: true },
    });
    this.scoreText.setOrigin(0.5);
    this.scoreText.setDepth(10);

    // Debug readout (pipe count and first pipe position)
    this.debugText = this.add.text(12, 12, 'Pipes: 0', {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      color: '#0b1f3b',
      backgroundColor: '#cfefff',
      padding: { x: 6, y: 4 },
    });
    this.debugText.setDepth(20);

    // Spawn first pipe immediately, then repeat
    this.spawnPipe();
    this.spawnTimer = this.time.addEvent({
      delay: SPAWN_INTERVAL,
      callback: this.spawnPipe,
      callbackScope: this,
      loop: true,
    });
  }

  flap() {
    if (this.gameOver) return;
    this.bird.flap();
  }

  spawnPipe() {
    if (this.gameOver) return;
    const pair = spawnPipePair(this);

    // Set up collision between bird and each pipe
    this.physics.add.collider(this.bird, pair.topPipe, this.hitObstacle, null, this);
    this.physics.add.collider(this.bird, pair.bottomPipe, this.hitObstacle, null, this);

    this.pipePairs.push(pair);
  }

  update(time, delta) {
    if (this.gameOver) return;

    const { height } = this.cameras.main;

    // Bird out of bounds
    if (this.bird.y < -20 || this.bird.y > height + 20) {
      this.triggerGameOver();
      return;
    }

    // Parallax seabed
    if (this.seabedFar && this.seabedNear) {
      const farSpeed = PIPE_SPEED * 0.15 * (delta / 1000);
      const nearSpeed = PIPE_SPEED * 0.35 * (delta / 1000);
      this.seabedFar.tilePositionX += farSpeed;
      this.seabedNear.tilePositionX += nearSpeed;
    }

    // Move pipes to the left and check scoring
    const moveAmount = PIPE_SPEED * (delta / 1000);

    if (this.debugText) {
      const first = this.pipePairs[0];
      if (first) {
        this.debugText.setText(
          `Pipes: ${this.pipePairs.length} | First X: ${first.topPipe.x.toFixed(1)}`
        );
      } else {
        this.debugText.setText('Pipes: 0');
      }
    }

    this.pipePairs.forEach((pair) => {
      pair.topPipe.x -= moveAmount;
      pair.bottomPipe.x -= moveAmount;

      // Keep physics body in sync
      if (pair.topPipe.body) {
        pair.topPipe.body.updateFromGameObject();
      }
      if (pair.bottomPipe.body) {
        pair.bottomPipe.body.updateFromGameObject();
      }

      // Scoring
      if (!pair.scored && pair.topPipe.x + PIPE_WIDTH / 2 < this.bird.x) {
        pair.scored = true;
        this.score++;
        this.scoreText.setText(this.score);
      }
    });

    // Remove off-screen pipes
    this.pipePairs = this.pipePairs.filter((pair) => {
      if (pair.topPipe.x < -100) {
        pair.topPipe.destroy();
        pair.bottomPipe.destroy();
        return false;
      }
      return true;
    });
  }

  hitObstacle() {
    if (this.gameOver) return;
    this.triggerGameOver();
  }

  triggerGameOver() {
    this.gameOver = true;
    this.physics.pause();
    this.spawnTimer.destroy();
    this.scene.start('GameOver', { score: this.score });
  }
}
