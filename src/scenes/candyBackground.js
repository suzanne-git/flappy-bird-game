export function createCandyBackground(scene) {
  const { width, height } = scene.cameras.main;

  const bg = scene.add.graphics();
  bg.fillGradientStyle(0xffb3e6, 0xff9ee8, 0xfff4b6, 0xffa6f5, 1);
  bg.fillRect(0, 0, width, height);

  const clouds = [
    { x: width * 0.18, y: height * 0.2, r: 34, a: 0.35 },
    { x: width * 0.26, y: height * 0.18, r: 24, a: 0.3 },
    { x: width * 0.7, y: height * 0.22, r: 38, a: 0.32 },
    { x: width * 0.78, y: height * 0.2, r: 26, a: 0.28 },
    { x: width * 0.5, y: height * 0.14, r: 18, a: 0.25 },
  ];

  clouds.forEach((cloud) => {
    scene.add.circle(cloud.x, cloud.y, cloud.r, 0xffffff, cloud.a);
  });

  const sparkles = [
    { x: width * 0.12, y: height * 0.32, r: 4 },
    { x: width * 0.42, y: height * 0.3, r: 3 },
    { x: width * 0.66, y: height * 0.34, r: 4 },
    { x: width * 0.84, y: height * 0.28, r: 3 },
  ];

  sparkles.forEach((sparkle) => {
    scene.add.circle(sparkle.x, sparkle.y, sparkle.r, 0xffffff, 0.45);
  });
}
