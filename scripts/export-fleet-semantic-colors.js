const fs = require('fs');
const path = require('path');

const lightPath = path.resolve(__dirname, '../src/app/examples/colors/Light-Blue.json');
const darkPath = path.resolve(__dirname, '../src/app/examples/colors/Dark-Blue.json');
const outPath = path.resolve(__dirname, '../src/lib/fleet-semantic-colors.json');

const light = JSON.parse(fs.readFileSync(lightPath, 'utf8'));
const dark = JSON.parse(fs.readFileSync(darkPath, 'utf8'));

const semantic = {
  light: light.colors,
  dark: dark.colors,
};

fs.writeFileSync(outPath, JSON.stringify(semantic, null, 2) + '\n');
console.log('✅ Exported fleet-semantic-colors.json from Light-Blue.json and Dark-Blue.json'); 