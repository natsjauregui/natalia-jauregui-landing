const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mannequinsDir = 'c:/Users/natsj/projects/natalia-jauregui-landing/images/mannequins';

const list = [
  { in: 'select-male.png', out: 'select-male.webp' },
  { in: 'select-female.png', out: 'select-female.webp' },
  { in: 'select-neutral.png', out: 'select-neutral.webp' }
];

async function optimize() {
  console.log("Optimizing official user-provided PNG mannequins to WebP...");

  for (const item of list) {
    const inPath = path.join(mannequinsDir, item.in);
    const outPath = path.join(mannequinsDir, item.out);

    if (fs.existsSync(inPath)) {
      const meta = await sharp(inPath).metadata();
      console.log(`Processing ${item.in}: ${meta.width}x${meta.height}, format=${meta.format}, channels=${meta.channels}`);

      // Trim transparent outer padding and convert to WebP with high quality
      const buffer = await sharp(inPath)
        .trim({ threshold: 5 })
        .webp({ quality: 92, effort: 6 })
        .toBuffer();

      fs.writeFileSync(outPath, buffer);
      console.log(`Saved ${item.out}: ${(buffer.length / 1024).toFixed(1)} KB (Original PNG was ${(fs.statSync(inPath).size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`File not found: ${inPath}`);
    }
  }

  console.log("All official mannequins optimized to WebP successfully!");
}

optimize().catch(console.error);
