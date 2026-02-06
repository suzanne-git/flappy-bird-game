import Phaser from 'phaser';

export default class Bird extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bird');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.06);
    this.setTint(0xffa84a);
    this.body.setSize(this.width * 0.8, this.height * 0.8, true);
    this.body.setAllowGravity(true);
    this.setBounce(0.1);

    this.flapForce = -400;
  }

  flap() {
    this.setVelocityY(this.flapForce);
  }
}
