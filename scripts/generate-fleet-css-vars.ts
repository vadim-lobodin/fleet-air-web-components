import { generateFleetCssVariables } from '../src/lib/fleet-colors'
import { writeFileSync } from 'fs'

const cssVars = generateFleetCssVariables()

writeFileSync('./fleet-semantic-vars-light.css', `:root {\n${cssVars.light}\n}\n`)
writeFileSync('./fleet-semantic-vars-dark.css', `.dark {\n${cssVars.dark}\n}\n`)

console.log('Fleet semantic CSS variable files generated!') 