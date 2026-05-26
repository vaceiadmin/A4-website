import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('./src');

// Map of old hex colors to new hex colors for the monochrome theme
const colorMap = {
  // Primary Blues -> Black / Dark Grey
  '#3b49e6': '#000000',
  '#4a5feb': '#111111',
  '#5b6ef5': '#111111',
  '#2f3bc4': '#111111',
  '#2536a8': '#000000',
  
  // Dark Navy Backgrounds -> Black / Very Dark Grey
  '#111235': '#000000',
  '#1e2040': '#111111',
  '#2a2d55': '#222222',
  '#151c38': '#000000',
  '#0f2a52': '#000000',
  '#1e2748': '#111111',
  '#26294a': '#111111',
  '#0a1836': '#0a0a0a',
  
  // Light Accents -> Light Greys
  '#eff0f6': '#e4e4e7',
  '#c7d4ff': '#d4d4d8',
  '#a9b0ff': '#d4d4d8',
  '#a3aaff': '#d4d4d8',
  '#7c8ce8': '#a1a1aa',
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let modifiedFiles = 0;

walkDir(SRC_DIR, function(filePath) {
  // Only process ts, tsx, css, json files
  if (!/\.(tsx?|css|json|jsx?)$/.test(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  for (const [oldHex, newHex] of Object.entries(colorMap)) {
    // Regex to match the hex color case-insensitively
    const regex = new RegExp(oldHex, 'gi');
    content = content.replace(regex, newHex);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    console.log('Updated:', filePath);
  }
});

console.log(`\nFinished replacing colors. Modified ${modifiedFiles} files.`);
