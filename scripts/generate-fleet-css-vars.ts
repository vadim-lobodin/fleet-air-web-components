const { fleetPalette, fleetSemanticColors } = require("../src/lib/fleet-colors");
const fs = require("fs");
const path = require("path");

function toCssVars(obj: Record<string, string>, selector: string) {
  let css = `${selector} {\n`;
  for (const [key, paletteKey] of Object.entries(obj)) {
    const cssVar = `--fleet-${key.replace(/\./g, "-")}`;
    css += `  ${cssVar}: ${fleetPalette[paletteKey] || "#FF00FF"};\n`;
  }
  css += "}\n";
  return css;
}

const outLight = path.resolve(__dirname, "../fleet-semantic-vars-light.css");
const outDark = path.resolve(__dirname, "../fleet-semantic-vars-dark.css");

fs.writeFileSync(outLight, toCssVars(fleetSemanticColors.light, ":root"));
fs.writeFileSync(outDark, toCssVars(fleetSemanticColors.dark, ".dark"));

console.log("✅ Generated fleet-semantic-vars-light.css and fleet-semantic-vars-dark.css");