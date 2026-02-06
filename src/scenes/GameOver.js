import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  init(data) {
    this.finalScore = data.score ?? 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    // Dark overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5);

    // Game Over text
    const gameOverText = this.add.text(width / 2, height / 3, 'Game Over', {
      fontSize: '56px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
      stroke: '#333333',
      strokeThickness: 4,
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
    const button = this.add.rectangle(width / 2, height / 2 + 60, 220, 60, 0x22aa44);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => button.setFillStyle(0x33bb55));
    button.on('pointerout', () => button.setFillStyle(0x22aa44));
    button.on('pointerdown', () => this.scene.start('Play'));

    const playAgainText = this.add.text(width / 2, height / 2 + 60, 'Play Again', {
      fontSize: '28px',
      fontFamily: 'Arial Black, sans-serif',
      color: '#ffffff',
    });
    playAgainText.setOrigin(0.5);

    // Menu button
    const menuButton = this.add.rectangle(width / 2, height / 2 + 140, 220, 50, 0x666666);
    menuButton.setInteractive({ useHandCursor: true });
    menuButton.on('pointerover', () => menuButton.setFillStyle(0x888888));
    menuButton.on('pointerout', () => menuButton.setFillStyle(0x666666));
    menuButton.on('pointerdown', () => this.scene.start('Menu'));

    const menuText = this.add.text(width / 2, height / 2 + 140, 'Main Menu', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
    });
    menuText.setOrigin(0.5);
  }
}
