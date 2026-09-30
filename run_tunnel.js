const { exec } = require('child_process');

function startTunnel() {
  console.log('[Tunnel Monitor] Iniciando localtunnel en puerto 8085 con subdominio witty-ads-fold...');
  const child = exec('npx.cmd localtunnel --port 8085 --subdomain witty-ads-fold');

  child.stdout.on('data', (data) => {
    console.log(data.toString().trim());
  });

  child.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });

  child.on('close', (code) => {
    console.log(`[Tunnel Monitor] Cerrado con código ${code}. Reconectando en 3s...`);
    setTimeout(startTunnel, 3000);
  });
}

startTunnel();
