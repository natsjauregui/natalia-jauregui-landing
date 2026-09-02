const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mannequinsDir = 'c:/Users/natsj/projects/natalia-jauregui-landing/images/mannequins';

const genders = ['male', 'female', 'neutral'];
const views = ['front', 'back', 'left', 'right'];

async function process360() {
  console.log("=== RE-ESCALANDO VISTAS 360° PARA LLENAR EL MARCO (GRANDE Y NÍTIDO) ===");

  for (const gender of genders) {
    console.log(`\n--- Silueta: ${gender.toUpperCase()} ---`);
    
    // Exact 1:2 ratio matching 400x800 canvas
    const TARGET_WIDTH = 800;
    const TARGET_HEIGHT = 1600;

    for (const view of views) {
      const filenamePng = `mannequin-${gender}-${view}.png`;
      const filenameWebp = `mannequin-${gender}-${view}.webp`;
      const inPath = path.join(mannequinsDir, filenamePng);
      const outPath = path.join(mannequinsDir, filenameWebp);

      if (!fs.existsSync(inPath)) {
        console.warn(`[!] Archivo no encontrado: ${filenamePng}`);
        continue;
      }

      // Trim all transparent borders
      const trimmedBuffer = await sharp(inPath)
        .trim({ threshold: 5 })
        .toBuffer();

      const trimmedMeta = await sharp(trimmedBuffer).metadata();

      // Scale figure to 1480px height inside 1600px canvas (fills 92.5% vertically)
      const figureHeight = 1480;
      const resizedFigure = await sharp(trimmedBuffer)
        .resize({ height: figureHeight, width: 760, fit: 'inside' })
        .toBuffer();

      // Composite onto 800x1600 transparent canvas
      const finalBuffer = await sharp({
        create: {
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{ input: resizedFigure, gravity: 'center' }])
      .webp({ quality: 94, effort: 6 })
      .toBuffer();

      fs.writeFileSync(outPath, finalBuffer);
      const outSizeKb = (finalBuffer.length / 1024).toFixed(1);
      console.log(`  -> ${filenameWebp}: ${outSizeKb} KB (Trim: ${trimmedMeta.width}x${trimmedMeta.height} -> Canvas 800x1600, Figure: ${figureHeight}px)`);
    }
  }

  console.log("\n=== TODAS LAS VISTAS 360° RE-ESCALADAS CON ÉXITO ===");
}

process360().catch(console.error);
