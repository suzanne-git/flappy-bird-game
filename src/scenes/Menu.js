import Phaser from 'phaser';

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);

    // Title
    const title = this.add.text(width / 2, height / 3, 'Sky Bird', {
      fontSize: '64px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
      stroke: '#333333',
      strokeThickness: 4,
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(width / 2, height / 3 + 60, 'Tap or click to fly!', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
    });
    subtitle.setOrigin(0.5);

    // Start button
    const button = this.add.rectangle(width / 2, height / 2 + 40, 200, 60, 0x22aa44);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => button.setFillStyle(0x33bb55));
    button.on('pointerout', () => button.setFillStyle(0x22aa44));
    button.on('pointerdown', () => this.scene.start('Play'));

    const startText = this.add.text(width / 2, height / 2 + 40, 'Play', {
      fontSize: '32px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
    });
    startText.setOrigin(0.5);

    // Instructions
    const instructions = this.add.text(width / 2, height - 80, 'Avoid the green pipes!\nPass through the gaps to score.', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      align: 'center',
    });
    instructions.setOrigin(0.5);
  }
}
