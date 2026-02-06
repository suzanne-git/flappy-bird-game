import Phaser from 'phaser';
import { createOceanBackground } from './oceanBackground.js';

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    createOceanBackground(this);

    // Title
    const title = this.add.text(width / 2, height / 3, 'Sky Bird', {
      fontSize: '64px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffd36a',
      stroke: '#0b1f3b',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#0b1f3b', blur: 0, fill: true },
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(width / 2, height / 3 + 60, 'Tap or click to fly!', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#e1f6ff',
    });
    subtitle.setOrigin(0.5);

    // Start button
    const button = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0xffa84a);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => button.setFillStyle(0xffc066));
    button.on('pointerout', () => button.setFillStyle(0xffa84a));
    button.on('pointerdown', () => this.scene.start('Play'));

    const startText = this.add.text(width / 2, height / 2 + 40, 'Play', {
      fontSize: '32px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
    });
    startText.setOrigin(0.5);

    // Instructions
    const instructions = this.add.text(width / 2, height - 80, 'Avoid the reef pipes!\nPass through the gaps to score.', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#e1f6ff',
      align: 'center',
    });
    instructions.setOrigin(0.5);
  }
}
