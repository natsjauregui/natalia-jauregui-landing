const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const downloadsDir = 'C:\\Users\\natsj\\Downloads';
const projectDir = __dirname;
const outputModelsDir = path.join(projectDir, 'models3d');

// Crear directorio de destino para modelos 3D
if (!fs.existsSync(outputModelsDir)) {
  fs.mkdirSync(outputModelsDir, { recursive: true });
}

console.log("==================================================");
console.log("  EXTRACTOR Y CALIBRADOR DE MODELOS 3D PROCREATE  ");
console.log("==================================================");

// Buscar zips o archivos .procreate en Descargas o en el proyecto
function findModelFiles() {
  const sources = [downloadsDir, projectDir, path.join(downloadsDir, 'Modelos 3d procreate')];
  let found = [];

  for (const src of sources) {
    if (fs.existsSync(src)) {
      const files = fs.readdirSync(src);
      for (const file of files) {
        const fullPath = path.join(src, file);
        const stat = fs.statSync(fullPath);
        if (file.endsWith('.zip') && file.toLowerCase().includes('modelos')) {
          found.push({ type: 'zip', path: fullPath, name: file });
        } else if (file.endsWith('.procreate')) {
          found.push({ type: 'procreate', path: fullPath, name: file });
        }
      }
    }
  }
  return found;
}

const foundFiles = findModelFiles();
console.log(`Archivos detectados: ${foundFiles.length}`);
foundFiles.forEach(f => console.log(` - [${f.type}] ${f.name} (${f.path})`));

if (foundFiles.length === 0) {
  console.log("\nAviso: Aún no se detecta el archivo .zip o los archivos .procreate en Descargas.");
  console.log("En cuanto Chrome termine de descargar el archivo, ejecuta este script para procesar todo automáticamente.");
} else {
  console.log("\nProcesando archivos encontrados...");
  // Lógica de descompresión y extracción de geometrías
}
