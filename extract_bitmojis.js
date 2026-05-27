const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public/assets/images/agents');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function extract(file) {
  const htmlContent = fs.readFileSync(file, 'utf8');
  const matches = [...htmlContent.matchAll(/"?([a-zA-Z0-9_]+)"?:\s*"data:image\/png;base64,([^"]+)"/g)];
  matches.forEach((match, idx) => {
    const key = match[1];
    const b64 = match[2];
    fs.writeFileSync(path.join(outDir, `${key.toLowerCase()}.png`), Buffer.from(b64, 'base64'));
    console.log(`Saved ${key}.png from ${file}`);
  });
}

extract('vacei-accounting-landing (2).html');
extract('vacei-business-landing (1).html');
