const fs = require('fs');
const path = require('path');

const hexMap = {
  '#3B78F5': '#71717A', // zinc-500
  '#1F5FD9': '#52525B', // zinc-600
  '#4F8EF7': '#A1A1AA', // zinc-400
  '#1A1C35': '#18181B', // zinc-900
  '#1C2130': '#18181B', // zinc-900
  '#1C2340': '#18181B', // zinc-900
  '#7AABFF': '#D4D4D8', // zinc-300
  '#9AA0B4': '#A1A1AA', // zinc-400
  '#9AA2B8': '#A1A1AA', // zinc-400
  '#13172A': '#09090B', // zinc-950
  '#7C3AED': '#71717A', // zinc-500 (purple)
  '#6B738F': '#71717A', // zinc-500
  '#0A0A0F': '#09090B', // zinc-950
  '#9FA4C9': '#D4D4D8', // zinc-300
  '#0F111A': '#09090B', // zinc-950
  '#1A48C8': '#3F3F46', // zinc-700
  '#4B4F6B': '#52525B', // zinc-600
  '#60A5FA': '#A1A1AA', // zinc-400
  '#EEF0F8': '#F4F4F5', // zinc-100
  '#4A5280': '#52525B', // zinc-600
  '#0EA5E9': '#71717A', // zinc-500
  '#A855F7': '#71717A', // zinc-500
  '#0F172A': '#09090B', // zinc-950
  '#1A4ED8': '#3F3F46', // zinc-700
  '#B0B3D6': '#D4D4D8', // zinc-300
  '#1A1D2B': '#18181B', // zinc-900
  '#3030F1': '#52525B', // zinc-600
  '#3B82F6': '#71717A', // zinc-500
  '#EEF1FA': '#F4F4F5', // zinc-100
  '#F8FAFF': '#FAFAFA', // zinc-50
  '#F0F2F8': '#F4F4F5', // zinc-100
  '#F2F4F8': '#F4F4F5', // zinc-100
  '#E4E8F0': '#E4E4E7', // zinc-200
  '#F0F4FF': '#FAFAFA', // zinc-50
  '#1E2438': '#18181B', // zinc-900
  '#4F86FF': '#A1A1AA', // zinc-400
  '#2563EB': '#52525B', // zinc-600
  '#D3D5EE': '#E4E4E7', // zinc-200
  '#0A0E27': '#09090B', // zinc-950
  '#151825': '#18181B', // zinc-900
  '#15162D': '#18181B', // zinc-900
  '#12141C': '#09090B', // zinc-950
  '#0C6EFD': '#71717A',
  '#1750C4': '#3F3F46',
  '#2B6CE8': '#52525B',
  '#2E5DE8': '#52525B',
  '#7B5CF5': '#71717A',
  '#9855F5': '#71717A',
  '#1E40AF': '#27272A',
  '#6D28D9': '#52525B',
  '#8B5CF6': '#A1A1AA',
  '#3B1F2F': '#27272A',
  '#1E1B4B': '#18181B',
  '#262B4B': '#27272A',
  '#2E254C': '#27272A',
  '#0B1220': '#09090B',
  '#131A33': '#09090B',
  '#1A2444': '#18181B',
  '#1A2640': '#18181B',
  '#1E2028': '#18181B',
  '#131826': '#09090B',
};

const rgbaReplacements = [
  { match: /rgba\(\s*59\s*,\s*130\s*,\s*246/g, replace: 'rgba(161, 161, 170' },
  { match: /rgba\(\s*31\s*,\s*95\s*,\s*217/g, replace: 'rgba(82, 82, 91' },
  { match: /rgba\(\s*46\s*,\s*93\s*,\s*232/g, replace: 'rgba(82, 82, 91' },
  { match: /rgba\(\s*79\s*,\s*142\s*,\s*247/g, replace: 'rgba(161, 161, 170' },
  { match: /rgba\(\s*59\s*,\s*120\s*,\s*245/g, replace: 'rgba(113, 113, 122' },
  { match: /rgba\(\s*31\s*,\s*38\s*,\s*135/g, replace: 'rgba(24, 24, 27' },
  { match: /rgba\(\s*59\s*,\s*73\s*,\s*230/g, replace: 'rgba(63, 63, 70' },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.match(/\.(tsx?|css)$/));
let modifiedFiles = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace Hex
  content = content.replace(/#[0-9A-Fa-f]{6}\b/g, match => {
    const upper = match.toUpperCase();
    return hexMap[upper] || match;
  });

  // Replace RGBA
  if (f.endsWith('.css') || f.endsWith('.tsx')) {
    rgbaReplacements.forEach(r => {
      content = content.replace(r.match, r.replace);
    });
  }

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    modifiedFiles++;
  }
});

console.log(`Modified ${modifiedFiles} files.`);
