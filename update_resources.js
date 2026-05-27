const fs = require('fs');
let code = fs.readFileSync('src/i18n/resources.ts', 'utf8');

const locales = ['en', 'fr', 'de', 'es', 'it', 'nl'];
const files = ['accounting', 'business', 'auditor-questionnaire'];

let imports = '\n// New App Routes\n';
locales.forEach(loc => {
  files.forEach(file => {
    const varName = loc + file.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    imports += `import ${varName} from "@/i18n/locales/${loc}/${file}.json";\n`;
  });
});

code = code.replace('export const resources = {', imports + '\nexport const resources = {');

locales.forEach(loc => {
  let adds = '';
  files.forEach(file => {
    const varName = loc + file.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    if (loc === 'en') {
      adds += `    "${file}": ${varName},\n`;
    } else {
      const enVarName = 'en' + file.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      adds += `    "${file}": mergeLocaleJson(${enVarName}, ${varName}),\n`;
    }
  });

  const target = new RegExp(`(\\b${loc}: \\{[^}]*?services: [^,]*,\\n?.*?)(\\s*\\})`);
  code = code.replace(target, (match, p1, p2) => p1 + "\n" + adds + p2);
});

fs.writeFileSync('src/i18n/resources.ts', code);
