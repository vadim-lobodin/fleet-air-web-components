const fs = require('fs');
const path = require('path');
require('ts-node').register({ transpileOnly: true });

(async () => {
  const { fleetSemanticColors } = await import('../src/lib/fleet-colors.ts');
  fs.writeFileSync(
    path.join(__dirname, '../src/lib/fleet-semantic-colors.json'),
    JSON.stringify(fleetSemanticColors, null, 2) + '\n'
  );
  console.log('✅ Exported full fleetSemanticColors to fleet-semantic-colors.json');
})(); 