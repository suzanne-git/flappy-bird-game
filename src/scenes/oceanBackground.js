export function createOceanBackground(scene) {
  const { width, height } = scene.cameras.main;

  const bg = scene.add.graphics();
  bg.fillGradientStyle(0x0b3d91, 0x0f6cbf, 0x0b3d91, 0x0a2b5a, 1);
  bg.fillRect(0, 0, width, height);
  bg.setDepth(0);

  const lightRays = scene.add.graphics();
  lightRays.fillStyle(0x9be7ff, 0.12);
  lightRays.beginPath();
  lightRays.moveTo(width * 0.1, 0);
  lightRays.lineTo(width * 0.35, 0);
  lightRays.lineTo(width * 0.25, height);
  lightRays.lineTo(0, height);
  lightRays.closePath();
  lightRays.fillPath();

  lightRays.beginPath();
  lightRays.moveTo(width * 0.55, 0);
  lightRays.lineTo(width * 0.75, 0);
  lightRays.lineTo(width * 0.65, height);
  lightRays.lineTo(width * 0.45, height);
  lightRays.closePath();
  lightRays.fillPath();
  lightRays.setDepth(0.1);

  const bubbles = [
    { x: width * 0.2, y: height * 0.3, r: 6 },
    { x: width * 0.28, y: height * 0.5, r: 4 },
    { x: width * 0.72, y: height * 0.35, r: 5 },
    { x: width * 0.8, y: height * 0.55, r: 4 },
  ];

  bubbles.forEach((bubble) => {
    scene.add.circle(bubble.x, bubble.y, bubble.r, 0xcff4ff, 0.3);
  });

  const seabedFar = scene.add.tileSprite(width / 2, height - 55, width, 90, 'seabedFar');
  seabedFar.setAlpha(0.9);
  seabedFar.setDepth(0.5);

  const seabedNear = scene.add.tileSprite(width / 2, height - 30, width, 110, 'seabedNear');
  seabedNear.setAlpha(0.95);
  seabedNear.setDepth(0.6);

  return { seabedFar, seabedNear };
}
