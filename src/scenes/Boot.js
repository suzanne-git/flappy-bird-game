import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    // Load bird image
    this.load.image('bird', new URL('../assets/images/bird.png', import.meta.url).href);

    const pipeGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    pipeGraphics.fillStyle(0xffa74c, 1);
    pipeGraphics.fillRect(0, 0, 60, 200);
    pipeGraphics.fillStyle(0xffc27f, 1);
    pipeGraphics.fillRect(8, 0, 8, 200);
    pipeGraphics.fillStyle(0xffd6a3, 1);
    pipeGraphics.fillCircle(14, 28, 4);
    pipeGraphics.fillCircle(38, 62, 3);
    pipeGraphics.fillCircle(26, 96, 4);
    pipeGraphics.fillCircle(16, 132, 3);
    pipeGraphics.fillCircle(40, 166, 4);
    pipeGraphics.generateTexture('reefPipe', 60, 200);

    const seabedFar = this.make.graphics({ x: 0, y: 0, add: false });
    seabedFar.fillStyle(0x0f3f52, 1);
    seabedFar.fillRect(0, 0, 220, 90);
    seabedFar.fillStyle(0x176176, 1);
    seabedFar.fillCircle(30, 70, 24);
    seabedFar.fillCircle(90, 80, 18);
    seabedFar.fillCircle(150, 72, 22);
    seabedFar.fillCircle(200, 78, 16);
    seabedFar.generateTexture('seabedFar', 220, 90);

    const seabedNear = this.make.graphics({ x: 0, y: 0, add: false });
    seabedNear.fillStyle(0x184f63, 1);
    seabedNear.fillRect(0, 0, 220, 110);
    seabedNear.fillStyle(0x1f778f, 1);
    seabedNear.fillCircle(40, 88, 30);
    seabedNear.fillCircle(100, 96, 24);
    seabedNear.fillCircle(170, 90, 28);
    seabedNear.fillCircle(210, 98, 20);
    seabedNear.generateTexture('seabedNear', 220, 110);
  }

  create() {
    this.scene.start('Menu');
  }
}
