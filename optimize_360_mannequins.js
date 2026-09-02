const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mannequinsDir = 'c:/Users/natsj/projects/natalia-jauregui-landing/images/mannequins';

const genders = ['male', 'female', 'neutral'];
const views = ['front', 'back', 'left', 'right'];

async function process360() {
  console.log("=== INICIANDO OPTIMIZACIÓN DE VISTAS 360° OFICIALES ===");

  for (const gender of genders) {
    console.log(`\n--- Procesando Silueta: ${gender.toUpperCase()} ---`);
    
    // Altura objetivo uniforme para todas las vistas del mismo género
    const TARGET_HEIGHT = 1200;
    const TARGET_WIDTH = 800;

    for (const view of views) {
      const filenamePng = `mannequin-${gender}-${view}.png`;
      const filenameWebp = `mannequin-${gender}-${view}.webp`;
      const inPath = path.join(mannequinsDir, filenamePng);
      const outPath = path.join(mannequinsDir, filenameWebp);

      if (!fs.existsSync(inPath)) {
        console.warn(`[!] Archivo no encontrado: ${filenamePng}`);
        continue;
      }

      const meta = await sharp(inPath).metadata();
      const inSizeKb = (fs.statSync(inPath).size / 1024).toFixed(1);

      // Trim transparent pixels, resize preserving aspect ratio, center on transparent canvas
      const trimmedBuffer = await sharp(inPath)
        .trim({ threshold: 5 })
        .toBuffer();

      const trimmedMeta = await sharp(trimmedBuffer).metadata();

      // Escalado uniforme para que la altura de la figura sea de 1050px aprox
      const figureHeight = 1050;
      const resizedFigure = await sharp(trimmedBuffer)
        .resize({ height: figureHeight, fit: 'inside' })
        .toBuffer();

      // Centrar en un lienzo de 800x1200 transparente
      const finalBuffer = await sharp({
        create: {
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
      .composite([{ input: resizedFigure, gravity: 'center' }])
      .webp({ quality: 92, effort: 6 })
      .toBuffer();

      fs.writeFileSync(outPath, finalBuffer);
      const outSizeKb = (finalBuffer.length / 1024).toFixed(1);
      console.log(`  -> ${filenameWebp}: ${outSizeKb} KB (Original: ${inSizeKb} KB, Trim: ${trimmedMeta.width}x${trimmedMeta.height} -> Canvas 800x1200)`);
    }
  }

  console.log("\n=== TODAS LAS VISTAS 360° OPTIMIZADAS EXITOSAMENTE ===");
}

process360().catch(console.error);
