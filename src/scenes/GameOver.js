import Phaser from 'phaser';
import { createOceanBackground } from './oceanBackground.js';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  init(data) {
    this.finalScore = data.score ?? 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    createOceanBackground(this);

    // Dark overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x041b2a, 0.45);

    // Game Over text
    const gameOverText = this.add.text(width / 2, height / 3, 'Game Over', {
      fontSize: '56px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
      stroke: '#0b1f3b',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#0b1f3b', blur: 0, fill: true },
    });
    gameOverText.setOrigin(0.5);

    // Score
    const scoreText = this.add.text(width / 2, height / 2 - 20, `Score: ${this.finalScore}`, {
      fontSize: '36px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
    });
    scoreText.setOrigin(0.5);

    // Play Again button
    const button = this.add.rectangle(width / 2, height / 2 + 60, 220, 60, 0xffa84a);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => button.setFillStyle(0xffc066));
    button.on('pointerout', () => button.setFillStyle(0xffa84a));
    button.on('pointerdown', () => this.scene.start('Play'));

    const playAgainText = this.add.text(width / 2, height / 2 + 60, 'Play Again', {
      fontSize: '28px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
    });
    playAgainText.setOrigin(0.5);

    // Menu button
    const menuButton = this.add.rectangle(width / 2, height / 2 + 140, 220, 50, 0x7ad6ff);
    menuButton.setInteractive({ useHandCursor: true });
    menuButton.on('pointerover', () => menuButton.setFillStyle(0xa2e6ff));
    menuButton.on('pointerout', () => menuButton.setFillStyle(0x7ad6ff));
    menuButton.on('pointerdown', () => this.scene.start('Menu'));

    const menuText = this.add.text(width / 2, height / 2 + 140, 'Main Menu', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#0b1f3b',
    });
    menuText.setOrigin(0.5);
  }
}
