const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const GENDERS = ['female', 'male', 'neutral'];
const VIEWS = ['front', 'back', 'left', 'right'];

// Subzone definitions with boundary boxes and perspective mapping
const SUBZONE_SPECS = [
  // BRAZOS
  {
    name: 'brazo-der-front.webp',
    view: 'front',
    box: { minX: 180, maxX: 320, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-der-back.webp',
    view: 'back',
    box: { minX: 480, maxX: 620, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-der-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-der-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-izq-front.webp',
    view: 'front',
    box: { minX: 480, maxX: 620, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-izq-back.webp',
    view: 'back',
    box: { minX: 180, maxX: 320, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-izq-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 560 }
  },
  {
    name: 'brazo-izq-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 560 }
  },
  // Media Manga Superior (Hombro + Bíceps/Tríceps)
  {
    name: 'brazo-der-superior-front.webp',
    view: 'front',
    box: { minX: 180, maxX: 330, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-der-superior-back.webp',
    view: 'back',
    box: { minX: 470, maxX: 620, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-der-superior-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-der-superior-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-izq-superior-front.webp',
    view: 'front',
    box: { minX: 470, maxX: 620, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-izq-superior-back.webp',
    view: 'back',
    box: { minX: 180, maxX: 330, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-izq-superior-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 360 }
  },
  {
    name: 'brazo-izq-superior-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 160, maxY: 360 }
  },
  // Media Manga Inferior (Antebrazo)
  {
    name: 'brazo-der-antebrazo-front.webp',
    view: 'front',
    box: { minX: 180, maxX: 310, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-der-antebrazo-back.webp',
    view: 'back',
    box: { minX: 490, maxX: 620, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-der-antebrazo-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-der-antebrazo-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-izq-antebrazo-front.webp',
    view: 'front',
    box: { minX: 490, maxX: 620, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-izq-antebrazo-back.webp',
    view: 'back',
    box: { minX: 180, maxX: 310, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-izq-antebrazo-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 340, maxY: 480 }
  },
  {
    name: 'brazo-izq-antebrazo-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 340, maxY: 480 }
  },
  // Mano
  {
    name: 'brazo-der-mano-front.webp',
    view: 'front',
    box: { minX: 180, maxX: 290, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-der-mano-back.webp',
    view: 'back',
    box: { minX: 510, maxX: 620, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-der-mano-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-der-mano-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-izq-mano-front.webp',
    view: 'front',
    box: { minX: 510, maxX: 620, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-izq-mano-back.webp',
    view: 'back',
    box: { minX: 180, maxX: 290, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-izq-mano-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 460, maxY: 570 }
  },
  {
    name: 'brazo-izq-mano-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 460, maxY: 570 }
  },

  // PECHO / TORSO
  {
    name: 'torso-pecho.webp',
    view: 'front',
    box: { minX: 270, maxX: 530, minY: 160, maxY: 300 }
  },
  {
    name: 'torso-pectoral-der.webp',
    view: 'front',
    box: { minX: 270, maxX: 400, minY: 160, maxY: 300 }
  },
  {
    name: 'torso-pectoral-izq.webp',
    view: 'front',
    box: { minX: 400, maxX: 530, minY: 160, maxY: 300 }
  },
  {
    name: 'torso-costilla-der.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 230, maxY: 450 }
  },
  {
    name: 'torso-costilla-izq.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 230, maxY: 450 }
  },
  {
    name: 'torso-costillas.webp',
    view: 'front',
    box: { minX: 270, maxX: 530, minY: 240, maxY: 440 }
  },
  {
    name: 'torso-abdomen.webp',
    view: 'front',
    box: { minX: 290, maxX: 510, minY: 280, maxY: 480 }
  },
  {
    name: 'torso.webp',
    view: 'front',
    box: { minX: 260, maxX: 540, minY: 160, maxY: 480 }
  },

  // ESPALDA
  {
    name: 'espalda.webp',
    view: 'back',
    box: { minX: 260, maxX: 540, minY: 150, maxY: 480 }
  },
  {
    name: 'espalda-alta.webp',
    view: 'back',
    box: { minX: 270, maxX: 530, minY: 150, maxY: 270 }
  },
  {
    name: 'espalda-escapula-der.webp',
    view: 'back',
    box: { minX: 260, maxX: 400, minY: 170, maxY: 320 }
  },
  {
    name: 'espalda-escapula-izq.webp',
    view: 'back',
    box: { minX: 400, maxX: 540, minY: 170, maxY: 320 }
  },
  {
    name: 'espalda-baja.webp',
    view: 'back',
    box: { minX: 290, maxX: 510, minY: 310, maxY: 480 }
  },

  // CUELLO Y CABEZA
  {
    name: 'cuello-front.webp',
    view: 'front',
    box: { minX: 350, maxX: 450, minY: 110, maxY: 180 }
  },
  {
    name: 'cuello-back.webp',
    view: 'back',
    box: { minX: 350, maxX: 450, minY: 110, maxY: 180 }
  },
  {
    name: 'cuello-left.webp',
    view: 'left',
    box: { minX: 340, maxX: 460, minY: 110, maxY: 180 }
  },
  {
    name: 'cuello-right.webp',
    view: 'right',
    box: { minX: 340, maxX: 460, minY: 110, maxY: 180 }
  },
  {
    name: 'head-neck-front.webp',
    view: 'front',
    box: { minX: 330, maxX: 470, minY: 15, maxY: 180 }
  },
  {
    name: 'head-neck-back.webp',
    view: 'back',
    box: { minX: 330, maxX: 470, minY: 15, maxY: 180 }
  },
  {
    name: 'head-neck-left.webp',
    view: 'left',
    box: { minX: 320, maxX: 480, minY: 15, maxY: 180 }
  },
  {
    name: 'head-neck-right.webp',
    view: 'right',
    box: { minX: 320, maxX: 480, minY: 15, maxY: 180 }
  },

  // PIERNAS
  {
    name: 'pierna-der-front.webp',
    view: 'front',
    box: { minX: 240, maxX: 400, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-der-back.webp',
    view: 'back',
    box: { minX: 400, maxX: 560, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-der-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-der-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-izq-front.webp',
    view: 'front',
    box: { minX: 400, maxX: 560, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-izq-back.webp',
    view: 'back',
    box: { minX: 240, maxX: 400, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-izq-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 1110 }
  },
  {
    name: 'pierna-izq-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 1110 }
  },
  // Muslos
  {
    name: 'pierna-der-muslo-front.webp',
    view: 'front',
    box: { minX: 240, maxX: 400, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-der-muslo-back.webp',
    view: 'back',
    box: { minX: 400, maxX: 560, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-der-muslo-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-der-muslo-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-izq-muslo-front.webp',
    view: 'front',
    box: { minX: 400, maxX: 560, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-izq-muslo-back.webp',
    view: 'back',
    box: { minX: 240, maxX: 400, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-izq-muslo-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 740 }
  },
  {
    name: 'pierna-izq-muslo-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 470, maxY: 740 }
  },
  // Pantorrilla / Gemelos / Espinilla
  {
    name: 'pierna-der-pantorrilla-front.webp',
    view: 'front',
    box: { minX: 250, maxX: 395, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-der-pantorrilla-back.webp',
    view: 'back',
    box: { minX: 405, maxX: 550, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-der-pantorrilla-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-der-pantorrilla-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-izq-pantorrilla-front.webp',
    view: 'front',
    box: { minX: 405, maxX: 550, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-izq-pantorrilla-back.webp',
    view: 'back',
    box: { minX: 250, maxX: 395, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-izq-pantorrilla-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 730, maxY: 1000 }
  },
  {
    name: 'pierna-izq-pantorrilla-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 730, maxY: 1000 }
  },
  // Pies
  {
    name: 'pierna-der-pie-front.webp',
    view: 'front',
    box: { minX: 250, maxX: 395, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-der-pie-back.webp',
    view: 'back',
    box: { minX: 405, maxX: 550, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-der-pie-external.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-der-pie-internal.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-izq-pie-front.webp',
    view: 'front',
    box: { minX: 405, maxX: 550, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-izq-pie-back.webp',
    view: 'back',
    box: { minX: 250, maxX: 395, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-izq-pie-external.webp',
    view: 'left',
    box: { minX: 300, maxX: 500, minY: 980, maxY: 1115 }
  },
  {
    name: 'pierna-izq-pie-internal.webp',
    view: 'right',
    box: { minX: 300, maxX: 500, minY: 980, maxY: 1115 }
  }
];

// Soft Mint Emerald color (delicate luminous medical green)
const GREEN_R = 0;
const GREEN_G = 255;
const GREEN_B = 136;
const FEATHER_MARGIN = 16; // Smooth edge transition

async function generateMasksForGender(gender) {
  const baseDir = path.join(__dirname, 'images/mannequins', gender);
  const outGreenDir = path.join(baseDir, 'green');
  
  if (!fs.existsSync(outGreenDir)) {
    fs.mkdirSync(outGreenDir, { recursive: true });
  }

  // Cache base images data for each view
  const baseImages = {};
  for (const v of VIEWS) {
    const baseImgPath = path.join(baseDir, `mannequin-${gender}-${v}.webp`);
    if (fs.existsSync(baseImgPath)) {
      const raw = await sharp(baseImgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      baseImages[v] = {
        data: raw.data,
        width: raw.info.width,
        height: raw.info.height
      };
    }
  }

  console.log(`Generating precise anatomical masks for ${gender}...`);

  for (const spec of SUBZONE_SPECS) {
    const base = baseImages[spec.view];
    if (!base) continue;

    const { data: baseData, width, height } = base;
    const outBuf = Buffer.alloc(width * height * 4, 0);

    const { minX, maxX, minY, maxY } = spec.box;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const baseAlpha = baseData[idx + 3];

        if (baseAlpha < 15) continue; // Outside mannequin body

        // Check if point (x, y) is inside the bounding box with smooth edge feathering
        if (x >= minX - FEATHER_MARGIN && x <= maxX + FEATHER_MARGIN &&
            y >= minY - FEATHER_MARGIN && y <= maxY + FEATHER_MARGIN) {

          // Calculate feathering factor (0.0 to 1.0)
          let distX = 1.0;
          if (x < minX) distX = (x - (minX - FEATHER_MARGIN)) / FEATHER_MARGIN;
          else if (x > maxX) distX = ((maxX + FEATHER_MARGIN) - x) / FEATHER_MARGIN;

          let distY = 1.0;
          if (y < minY) distY = (y - (minY - FEATHER_MARGIN)) / FEATHER_MARGIN;
          else if (y > maxY) distY = ((maxY + FEATHER_MARGIN) - y) / FEATHER_MARGIN;

          const feather = Math.max(0, Math.min(1, distX * distY));
          if (feather <= 0.02) continue;

          const alphaFactor = feather * (baseAlpha / 255.0);

          outBuf[idx] = GREEN_R;
          outBuf[idx + 1] = GREEN_G;
          outBuf[idx + 2] = GREEN_B;
          // Alpha: 185 for delicate luminous mint tint
          outBuf[idx + 3] = Math.floor(alphaFactor * 185);
        }
      }
    }

    const outPath = path.join(outGreenDir, spec.name);
    await sharp(outBuf, { raw: { width, height, channels: 4 } })
      .webp({ quality: 90, effort: 4 })
      .toFile(outPath);
  }

  console.log(`✓ Completed masks for ${gender} (${SUBZONE_SPECS.length} subzone files generated).`);
}

async function main() {
  for (const g of GENDERS) {
    await generateMasksForGender(g);
  }
  console.log('All anatomical masks successfully created with precise body boundaries!');
}

main().catch(console.error);
