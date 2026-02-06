import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    // Load bird image
    this.load.image('bird', new URL('../assets/images/bird.png', import.meta.url).href);

    const pipeGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    pipeGraphics.fillStyle(0x22aa44, 1);
    pipeGraphics.fillRect(0, 0, 60, 400);
    pipeGraphics.fillStyle(0x1a8833, 1);
    pipeGraphics.fillRect(4, 4, 52, 392);
    pipeGraphics.generateTexture('pipe', 60, 400);

    const pipeCapGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    pipeCapGraphics.fillStyle(0x22aa44, 1);
    pipeCapGraphics.fillRect(0, 0, 76, 40);
    pipeCapGraphics.fillStyle(0x1a8833, 1);
    pipeCapGraphics.fillRect(4, 4, 68, 32);
    pipeCapGraphics.generateTexture('pipeCap', 76, 40);
  }

  create() {
    this.scene.start('Menu');
  }
}
