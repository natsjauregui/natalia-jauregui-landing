const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadDir = 'C:/Users/natsj/.gemini/antigravity-ide/brain/f8e24a5d-25d0-4a45-bbd7-1c0d120c2ea0/.user_uploaded';
const outputDir = 'c:/Users/natsj/projects/natalia-jauregui-landing/images/mannequins';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Inspect the 3 files
const files = [
  'media_1788236065317.jpg',
  'media_1788236065349.jpg',
  'media_1788236065357.jpg'
];

async function processIndividualMannequin(filename, outName) {
  const filePath = path.join(uploadDir, filename);
  const meta = await sharp(filePath).metadata();
  const W = meta.width;
  const H = meta.height;

  // Crop top header text (~12%) and bottom footer note (~5%)
  const cropTop = Math.floor(H * 0.12);
  const cropBottom = Math.floor(H * 0.95);
  const cropH = cropBottom - cropTop;

  const rawExtracted = await sharp(filePath)
    .extract({ left: 0, top: cropTop, width: W, height: cropH })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = rawExtracted.info.width;
  const height = rawExtracted.info.height;
  const data = rawExtracted.data; // RGBA Uint8Array

  // Sample background color from extreme corners
  const bgSamples = [];
  const getPixel = (x, y) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i+1], data[i+2]];
  };

  for (let s = 0; s < 10; s++) {
    bgSamples.push(getPixel(s, s));
    bgSamples.push(getPixel(width - 1 - s, s));
    bgSamples.push(getPixel(s, height - 1 - s));
    bgSamples.push(getPixel(width - 1 - s, height - 1 - s));
    bgSamples.push(getPixel(Math.floor(width/2), s));
  }

  let avgBgR = 0, avgBgG = 0, avgBgB = 0;
  for (const s of bgSamples) {
    avgBgR += s[0]; avgBgG += s[1]; avgBgB += s[2];
  }
  avgBgR /= bgSamples.length;
  avgBgG /= bgSamples.length;
  avgBgB /= bgSamples.length;

  console.log(`${outName} - Sampled background color: [${Math.round(avgBgR)}, ${Math.round(avgBgG)}, ${Math.round(avgBgB)}]`);

  // Professional Defringe & Matte extraction
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Distance to background color
    const distToBg = Math.sqrt((r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2);
    
    // Mannequin is shaded neutral gray where R ~ G ~ B and luminance is significantly darker than cream background
    const isBrightBg = (r > 218 && g > 210 && b > 200) || (distToBg < 28);
    
    if (isBrightBg) {
      data[i + 3] = 0; // 100% transparent
    } else if (distToBg < 45 || (r > 205 && g > 198 && b > 190)) {
      // Transition boundary pixel: defringe white halo by adjusting alpha and pulling color inward
      const alphaFactor = Math.max(0, Math.min(1, (45 - distToBg) / 25));
      const alpha = Math.floor((1 - alphaFactor) * 255);
      data[i + 3] = alpha;

      // Defringe: desaturate edge glow and darken slightly so it doesn't appear as a white halo on black
      data[i] = Math.min(r, 175);
      data[i + 1] = Math.min(g, 170);
      data[i + 2] = Math.min(b, 170);
    } else {
      data[i + 3] = 255; // Solid opaque mannequin
    }
  }

  // Trim transparent padding to get tight clean bounding box
  const trimmed = await sharp(data, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 10 })
    .webp({ quality: 92, effort: 6 })
    .toBuffer();

  const outPath = path.join(outputDir, outName);
  fs.writeFileSync(outPath, trimmed);
  console.log(`Successfully generated clean defringed asset: ${outName} (${(trimmed.length / 1024).toFixed(1)} KB)`);
}

async function run() {
  // Let's identify the 3 files:
  // 1788236065317.jpg -> Indefinido / No Binario (Equilibrio)
  // 1788236065349.jpg -> Femenino (Elegancia)
  // 1788236065357.jpg -> Masculino (Confianza)

  console.log("Processing individual full-body mannequins with studio defringing...");

  await processIndividualMannequin('media_1788236065357.jpg', 'select-male.webp');
  await processIndividualMannequin('media_1788236065349.jpg', 'select-female.webp');
  await processIndividualMannequin('media_1788236065317.jpg', 'select-neutral.webp');

  console.log("All individual mannequin poses processed with razor-sharp clean edges!");
}

run().catch(console.error);
