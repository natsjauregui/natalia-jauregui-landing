const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
console.log('Using ffmpeg at:', ffmpegPath);

const imagesDir = path.join(__dirname, 'images');
const originalsDir = path.join(imagesDir, 'originals_video');

if (!fs.existsSync(originalsDir)) {
  fs.mkdirSync(originalsDir, { recursive: true });
}

const videoFiles = [
  'video-bienvenida.mp4',
  'video-concepto.mp4',
  'video-tooltip.mp4',
  'video-cierre.mp4'
];

videoFiles.forEach(file => {
  const srcPath = path.join(imagesDir, file);
  if (!fs.existsSync(srcPath)) {
    console.log('File not found:', file);
    return;
  }

  const backupPath = path.join(originalsDir, file);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(srcPath, backupPath);
    console.log(`Backed up original: ${file}`);
  }

  const tempOut = path.join(imagesDir, 'temp_' + file);
  const origSize = fs.statSync(srcPath).size / (1024 * 1024);

  console.log(`Optimizing ${file} (${origSize.toFixed(2)} MB)...`);

  // Optimized web encoding: H.264, CRF 26, +faststart, 720p max, YUV420p
  const cmd = `"${ffmpegPath}" -y -i "${backupPath}" -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k -vf "scale='min(1280,iw)':-2" "${tempOut}"`;

  try {
    execSync(cmd, { stdio: 'inherit' });
    if (fs.existsSync(tempOut) && fs.statSync(tempOut).size > 0) {
      fs.copyFileSync(tempOut, srcPath);
      fs.unlinkSync(tempOut);
      const newSize = fs.statSync(srcPath).size / (1024 * 1024);
      console.log(`✓ Completed ${file}: ${origSize.toFixed(2)} MB -> ${newSize.toFixed(2)} MB (${((1 - newSize/origSize)*100).toFixed(1)}% reduction)\n`);
    }
  } catch (err) {
    console.error(`Error optimizing ${file}:`, err.message);
    if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
  }
});

console.log('All videos optimized with +faststart and H.264 web compatibility!');
