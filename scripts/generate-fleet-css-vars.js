const fs = require('fs');
const path = require('path');

const palette = require('../src/lib/fleet-palette.json');
const semantic = require('../src/lib/fleet-semantic-colors.json');

function generateVars(theme) {
  const vars = Object.entries(semantic[theme])
    .map(([token, paletteKey]) => {
      const cssVar = `--fleet-${token.replace(/\./g, '-')}`;
      const hex = palette[paletteKey] || paletteKey || '#FF00FF';
      return `  ${cssVar}: ${hex};`;
    })
    .join('\n');
  return `:root {\n${vars}\n}`;
}

fs.writeFileSync(
  path.join(__dirname, '../fleet-semantic-vars-light.css'),
  generateVars('light') + '\n'
);
fs.writeFileSync(
  path.join(__dirname, '../fleet-semantic-vars-dark.css'),
  generateVars('dark') + '\n'
);

console.log('✅ Generated fleet-semantic-vars-light.css and fleet-semantic-vars-dark.css'); 