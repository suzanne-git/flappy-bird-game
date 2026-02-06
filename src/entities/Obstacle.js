import Phaser from 'phaser';

const GAP = 240;
const PIPE_WIDTH = 60;

export function spawnPipePair(scene) {
  const { width, height } = scene.cameras.main;
  const gapCenter = Phaser.Math.Between(GAP / 2 + 60, height - GAP / 2 - 60);

  const topPipeBottom = gapCenter - GAP / 2;
  const bottomPipeTop = gapCenter + GAP / 2;

  // Top pipe: hangs from top of screen down to topPipeBottom
  const topPipe = scene.add.tileSprite(
    width + PIPE_WIDTH,
    topPipeBottom / 2,
    PIPE_WIDTH,
    topPipeBottom,
    'reefPipe'
  );
  topPipe.setDepth(1);
  topPipe.setAlpha(1);

  // Bottom pipe: rises from bottomPipeTop to bottom of screen
  const bottomPipe = scene.add.tileSprite(
    width + PIPE_WIDTH,
    bottomPipeTop + (height - bottomPipeTop) / 2,
    PIPE_WIDTH,
    height - bottomPipeTop,
    'reefPipe'
  );
  bottomPipe.setDepth(1);
  bottomPipe.setAlpha(1);

  // Add physics for collision detection only
  scene.physics.add.existing(topPipe, false);
  scene.physics.add.existing(bottomPipe, false);
  topPipe.body.setAllowGravity(false);
  bottomPipe.body.setAllowGravity(false);
  topPipe.body.setImmovable(true);
  bottomPipe.body.setImmovable(true);

  return { topPipe, bottomPipe, gapCenter, scored: false };
}
