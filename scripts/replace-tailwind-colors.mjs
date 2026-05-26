import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('./src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let modifiedFiles = 0;

walkDir(SRC_DIR, function(filePath) {
  if (!/\.(tsx?|jsx?|css|json)$/.test(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace tailwind color prefixes
  // e.g. blue-50, cyan-500/10, text-indigo-600, etc.
  const regex = /\b(blue|cyan|sky|indigo|purple|violet)-(\d{2,3})\b/g;
  content = content.replace(regex, 'zinc-$2');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    console.log('Updated:', filePath);
  }
});

console.log(`\nFinished replacing Tailwind colors. Modified ${modifiedFiles} files.`);
