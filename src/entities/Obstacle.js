import Phaser from 'phaser';

const GAP = 180;
const PIPE_WIDTH = 60;
const PIPE_SPEED = 200;

export function createObstacleGroup(scene) {
  return scene.physics.add.group();
}

export function spawnObstacle(scene, pipes) {
  const { width, height } = scene.cameras.main;
  const gapCenter = Phaser.Math.Between(GAP / 2 + 60, height - GAP / 2 - 60);

  const topHeight = gapCenter - GAP / 2;
  const bottomY = gapCenter + GAP / 2;
  const bottomHeight = height - bottomY + 20;

  const topPipe = scene.physics.add.image(width + PIPE_WIDTH, 0, 'pipe');
  topPipe.setOrigin(0.5, 1);
  topPipe.setDisplaySize(PIPE_WIDTH, Math.max(40, topHeight));

  const bottomPipe = scene.physics.add.image(width + PIPE_WIDTH, height + 20, 'pipe');
  bottomPipe.setOrigin(0.5, 0);
  bottomPipe.setDisplaySize(PIPE_WIDTH, Math.max(40, bottomHeight));

  topPipe.body.setAllowGravity(false);
  bottomPipe.body.setAllowGravity(false);
  topPipe.body.setSize(PIPE_WIDTH, topPipe.displayHeight);
  topPipe.body.setOffset(-PIPE_WIDTH / 2, -topPipe.displayHeight);
  bottomPipe.body.setSize(PIPE_WIDTH, bottomPipe.displayHeight);
  bottomPipe.body.setOffset(-PIPE_WIDTH / 2, 0);

  topPipe.body.velocity.x = -PIPE_SPEED;
  bottomPipe.body.velocity.x = -PIPE_SPEED;

  pipes.add(topPipe, true);
  pipes.add(bottomPipe, true);

  return { topPipe, bottomPipe, gapCenter };
}
