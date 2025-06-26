const fs = require("fs");
const path = require("path");

// Paths to your files
const lightPath = path.resolve(__dirname, "../src/app/examples/colors/Light-Blue.json");
const darkPath = path.resolve(__dirname, "../src/app/examples/colors/Dark-Blue.json");
const fleetColorsPath = path.resolve(__dirname, "../src/lib/fleet-colors.ts");
const fleetSemanticColorsJsonPath = path.resolve(__dirname, "../src/lib/fleet-semantic-colors.json");

// Read and parse both JSONs
const light = JSON.parse(fs.readFileSync(lightPath, "utf8"));
const dark = JSON.parse(fs.readFileSync(darkPath, "utf8"));

const lightColors = light.colors;
const darkColors = dark.colors;

// Collect all unique keys
const allKeys = new Set([...Object.keys(lightColors), ...Object.keys(darkColors)]);

// Build the merged mapping
const lightMapping = {};
const darkMapping = {};

for (const key of allKeys) {
  lightMapping[key] = lightColors[key] || "#FF00FF";
  darkMapping[key] = darkColors[key] || "#FF00FF";
}

// Read the original fleet-colors.ts
let fleetColorsContent = fs.readFileSync(fleetColorsPath, "utf8");

// Replace the fleetSemanticColors definition
const newMapping = `export const fleetSemanticColors: { light: Record<string, string>; dark: Record<string, string> } = {
  light: ${JSON.stringify(lightMapping, null, 2)},
  dark: ${JSON.stringify(darkMapping, null, 2)}
};`;

// Replace the old mapping (greedy match)
fleetColorsContent = fleetColorsContent.replace(
  /export const fleetSemanticColors:[\s\S]*?\};\n/,
  newMapping + "\n"
);

// Write back to fleet-colors.ts
fs.writeFileSync(fleetColorsPath, fleetColorsContent);

// Also update fleet-semantic-colors.json
const semanticJson = { light: lightMapping, dark: darkMapping };
fs.writeFileSync(fleetSemanticColorsJsonPath, JSON.stringify(semanticJson, null, 2) + '\n');

console.log("✅ fleet-colors.ts and fleet-semantic-colors.json have been updated with the full semantic color mapping.");