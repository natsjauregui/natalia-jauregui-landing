const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadDir = 'C:/Users/natsj/.gemini/antigravity-ide/brain/f8e24a5d-25d0-4a45-bbd7-1c0d120c2ea0/.user_uploaded';
const outputDir = 'c:/Users/natsj/projects/natalia-jauregui-landing/images/mannequins';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extractCleanFigure(inputPath, cropRegion, preCleanFn = null) {
  const extracted = await sharp(inputPath).extract(cropRegion).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const width = extracted.info.width;
  const height = extracted.info.height;
  const data = extracted.data; // RGBA Uint8Array

  // Apply pre-clean if provided
  if (preCleanFn) {
    preCleanFn(data, width, height);
  }

  // 1. Transparentize background
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isLightBg = (r > 228 && g > 222 && b > 212) || (r > 218 && g > 212 && b > 204 && Math.abs(r - g) < 8);

    if (isLightBg) {
      data[i + 3] = 0; // transparent
    } else {
      if (r > 212 && g > 206 && b > 198) {
        const factor = (228 - r) / 16;
        data[i + 3] = Math.max(0, Math.min(255, Math.floor(factor * 255)));
      }
    }
  }

  return sharp(data, { raw: { width, height, channels: 4 } });
}

async function run() {
  console.log("Extracting and cleaning all poses perfectly...");

  const posesPath = path.join(uploadDir, 'media_1788234424034.jpg');
  const posesMeta = await sharp(posesPath).metadata();
  const W = posesMeta.width;
  const H = posesMeta.height;

  const cropTop = Math.floor(H * 0.115);
  const cropBottom = Math.floor(H * 0.94);
  const figureHeight = cropBottom - cropTop;

  // 1. Male pose (left)
  const maleCrop = { left: 0, top: cropTop, width: Math.floor(W * 0.35), height: figureHeight };
  const maleImg = await extractCleanFigure(posesPath, maleCrop);
  await maleImg.webp({ quality: 90, effort: 6 }).toFile(path.join(outputDir, 'select-male.webp'));
  console.log("Cleaned & saved: select-male.webp");

  // 2. Female pose (center)
  const femaleCrop = { left: Math.floor(W * 0.33), top: cropTop, width: Math.floor(W * 0.35), height: figureHeight };
  const femaleImg = await extractCleanFigure(posesPath, femaleCrop, (data, w, h) => {
    // Clear neighbor male elbow on upper-left
    for (let y = 0; y < Math.floor(h * 0.50); y++) {
      for (let x = 0; x < Math.floor(w * 0.28); x++) {
        data[(y * w + x) * 4 + 3] = 0;
      }
    }
  });
  await femaleImg.webp({ quality: 90, effort: 6 }).toFile(path.join(outputDir, 'select-female.webp'));
  console.log("Cleaned & saved: select-female.webp");

  // 3. Neutral pose (right)
  const neutralCrop = { left: Math.floor(W * 0.65), top: cropTop, width: Math.floor(W * 0.35), height: figureHeight };
  const neutralImg = await extractCleanFigure(posesPath, neutralCrop, (data, w, h) => {
    // Clear neighbor female elbow on upper-left
    for (let y = 0; y < Math.floor(h * 0.48); y++) {
      for (let x = 0; x < Math.floor(w * 0.25); x++) {
        data[(y * w + x) * 4 + 3] = 0;
      }
    }
  });
  await neutralImg.webp({ quality: 90, effort: 6 }).toFile(path.join(outputDir, 'select-neutral.webp'));
  console.log("Cleaned & saved: select-neutral.webp");

  console.log("All 3 cards processed cleanly!");
}

run().catch(console.error);
