import Phaser from 'phaser';
import Bird from '../entities/Bird.js';
import { createObstacleGroup, spawnObstacle } from '../entities/Obstacle.js';

const PIPE_WIDTH = 60;
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

    // Sky background
    this.add.rectangle(width / 2, height / 2, width * 2, height * 2, 0x87ceeb);

    // Bird
    this.bird = new Bird(this, width / 4, height / 2);

    // Obstacles
    this.pipes = createObstacleGroup(this);
    this.add.existing(this.pipes);
    this.pipes.setDepth(10);

    // Input: tap or click to flap
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard?.on('keydown-SPACE', (e) => {
      e.preventDefault();
      this.flap();
    });

    // Collision: bird vs pipes
    this.physics.add.collider(this.bird, this.pipes, this.hitObstacle, null, this);

    // Bird dies if it goes off top or bottom (checked in update)

    // Score text
    this.scoreText = this.add.text(width / 2, 50, '0', {
      fontSize: '48px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    });
    this.scoreText.setOrigin(0.5);

    // Spawn first obstacle after a short delay
    this.time.delayedCall(1500, () => this.spawnPipe());
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
    const pair = spawnObstacle(this, this.pipes);
    pair.scored = false;
    this.pipePairs.push(pair);
  }

  update() {
    if (this.gameOver) return;

    const { height } = this.cameras.main;
    if (this.bird.y < -20 || this.bird.y > height + 20) {
      this.triggerGameOver();
      return;
    }

    // Check if bird passed through a gap (scoring)
    this.pipePairs.forEach((pair) => {
      if (!pair.scored && pair.topPipe.x + PIPE_WIDTH / 2 < this.bird.x) {
        pair.scored = true;
        this.score++;
        this.scoreText.setText(this.score);
      }
    });

    // Remove off-screen pipes and their pair data
    this.pipePairs = this.pipePairs.filter((pair) => pair.topPipe.x > -100);
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
