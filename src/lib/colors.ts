/**
 * Fleet Air Web Components - Color System
 * Based on Fleet's Compose color themes with Radix UI patterns
 */

// Base palette colors from Fleet themes
export const palette = {
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  
  // Neutral scale
  neutral: {
    10: '#090909',
    20: '#18191B',
    30: '#252629',
    40: '#323438',
    50: '#3E4147',
    60: '#4C5157',
    70: '#5D636B',
    80: '#646B71',
    90: '#6E747B',
    100: '#7A7F86',
    110: '#898E94',
    120: '#9EA3A8',
    130: '#C3C5C9',
    140: '#E0E1E4',
    150: '#EEEFF0',
    160: '#F8F8F9',
  },
  
  // Blue scale
  blue: {
    10: '#06090F',
    20: '#111926',
    30: '#18263C',
    40: '#1E3455',
    50: '#224271',
    60: '#225090',
    70: '#1D61BA',
    80: '#1868CB',
    90: '#0870E4',
    100: '#2A7DEB',
    110: '#4B8DEC',
    120: '#71A3EF',
    130: '#A8C6F4',
    140: '#D6E3F9',
    150: '#E9EFFC',
    160: '#F7F8FE',
  },
  
  // Green scale
  green: {
    10: '#060A08',
    20: '#111B16',
    30: '#182921',
    40: '#1F392D',
    50: '#234939',
    60: '#255A44',
    70: '#216F52',
    80: '#1E7857',
    90: '#14835E',
    100: '#169068',
    110: '#409D78',
    120: '#69B090',
    130: '#A3CEB8',
    140: '#D2E7DB',
    150: '#E6F2EA',
    160: '#F5FAF5',
  },
  
  // Red scale
  red: {
    10: '#100607',
    20: '#291214',
    30: '#401A1E',
    40: '#592228',
    50: '#742831',
    60: '#922C3B',
    70: '#B82D46',
    80: '#C72C49',
    90: '#D73251',
    100: '#E1465E',
    110: '#EC5D6F',
    120: '#F87C88',
    130: '#FFB0B5',
    140: '#FFD8DA',
    150: '#FFE9EA',
    160: '#FFF8F8',
  },
  
  // Yellow scale
  yellow: {
    10: '#0C0805',
    20: '#20180C',
    30: '#302412',
    40: '#433016',
    50: '#573D18',
    60: '#6C4B18',
    70: '#865A15',
    80: '#916012',
    90: '#9F680C',
    100: '#B07203',
    110: '#BD8128',
    120: '#CD984D',
    130: '#E5BF8C',
    140: '#F5DEC2',
    150: '#FCEDDC',
    160: '#FFF8EF',
  },
  
  // Violet scale
  violet: {
    10: '#080810',
    20: '#17172B',
    30: '#222342',
    40: '#2E2E61',
    50: '#3A3982',
    60: '#4843A8',
    70: '#594CDD',
    80: '#604EF3',
    90: '#685AFB',
    100: '#726CF9',
    110: '#7F80F9',
    120: '#9599F9',
    130: '#BDC0FA',
    140: '#DEDFFC',
    150: '#EEEDFD',
    160: '#F9F7FE',
  },
  
  // Purple scale
  purple: {
    10: '#0B080D',
    20: '#1E1524',
    30: '#2F2139',
    40: '#412B50',
    50: '#55346A',
    60: '#6A3D88',
    70: '#8646AE',
    80: '#9049BE',
    90: '#9D4FCF',
    100: '#A660D4',
    110: '#B174D9',
    120: '#C08FE0',
    130: '#D8B9EC',
    140: '#EDDCF5',
    150: '#F6EAF9',
    160: '#FDF6FD',
  },
  
  // Tints (alpha values)
  lightTint: {
    4: '#FFFFFF0B',
    7: '#FFFFFF12',
    9: '#FFFFFF16',
    11: '#FFFFFF1B',
    13: '#FFFFFF21',
    17: '#FFFFFF2C',
    26: '#FFFFFF43',
    35: '#FFFFFF59',
    44: '#FFFFFF6F',
    52: '#FFFFFF85',
    61: '#FFFFFF9B',
    69: '#FFFFFFB1',
    72: '#FFFFFFB8',
    75: '#FFFFFFBF',
  },
  
  darkTint: {
    3: '#00000007',
    5: '#0000000C',
    6: '#00000010',
    9: '#00000018',
    13: '#00000022',
    18: '#0000002E',
    27: '#00000046',
    45: '#00000073',
    54: '#0000008B',
    60: '#00000099',
    63: '#000000A0',
  },
  
  // Brand tints
  blueTint: {
    5: '#0870E40D',
    10: '#0870E41A',
    15: '#0870E426',
    20: '#0870E433',
    25: '#0870E440',
    30: '#0870E44D',
    40: '#0870E466',
    50: '#0870E480',
    60: '#0870E499',
  },
  
  greenTint: {
    10: '#14835E1A',
    15: '#14835E26',
    20: '#14835E33',
    40: '#14835E66',
    50: '#14835E80',
  },
  
  redTint: {
    10: '#D732511A',
    15: '#D7325126',
    20: '#D7325133',
    30: '#D732514D',
    50: '#D7325180',
  },
  
  yellowTint: {
    10: '#9F680C1A',
    15: '#9F680C26',
    20: '#9F680C33',
    40: '#9F680C66',
    50: '#9F680C80',
  },
  
  violetTint: {
    15: '#685AFB26',
    20: '#685AFB33',
    30: '#685AFB4D',
    40: '#685AFB66',
    50: '#685AFB80',
  },
  
  purpleTint: {
    15: '#9D4FCF26',
    20: '#9D4FCF33',
    40: '#9D4FCF66',
  },
  
  // Bright colors
  bright: {
    blue: '#05A8FA',
    teal: '#1AC7BE',
    green: '#13BF86',
    yellow: '#E59408',
    orange: '#FF790D',
    magenta: '#F558BB',
    purple: '#BC7EFF',
    violet: '#8A80FF',
  },
  
  transparent: '#FFFFFF00',
} as const;

// Semantic color tokens for light theme
export const lightColors = {
  // Text colors
  textPrimary: palette.neutral[10],
  textSecondary: palette.darkTint[54],
  textTertiary: palette.darkTint[45],
  textPositive: palette.green[80],
  textDangerous: palette.red[80],
  textWarning: palette.yellow[80],
  textDisabled: palette.darkTint[45],
  textBright: palette.neutral[10],
  textAccent: palette.blue[80],
  
  // Background colors
  backgroundPrimary: palette.neutral[150],
  backgroundSecondary: palette.neutral[160],
  
  // Border colors
  border: palette.darkTint[18],
  borderFocused: palette.blue[100],
  focusOutline: palette.blue[130],
  
  // Button colors
  button: {
    primary: {
      background: palette.blue[90],
      backgroundHovered: palette.blue[80],
      backgroundPressed: palette.blue[70],
      backgroundDisabled: palette.darkTint[6],
      border: palette.blue[90],
      borderHovered: palette.blue[80],
      borderPressed: palette.blue[70],
      borderDisabled: palette.darkTint[9],
      text: palette.white,
      textDisabled: palette.darkTint[45],
      focusBorder: palette.white,
      focusOutline: palette.blue[90],
    },
    secondary: {
      background: palette.transparent,
      backgroundHovered: palette.darkTint[3],
      backgroundPressed: palette.darkTint[6],
      backgroundDisabled: palette.darkTint[6],
      border: palette.darkTint[18],
      borderHovered: palette.darkTint[18],
      borderPressed: palette.darkTint[18],
      borderDisabled: palette.darkTint[9],
      text: palette.neutral[10],
      textDisabled: palette.darkTint[45],
      focusBorder: palette.blue[100],
      focusOutline: palette.blue[130],
    },
    dangerous: {
      background: palette.red[90],
      backgroundHovered: palette.red[80],
      backgroundPressed: palette.red[70],
      backgroundDisabled: palette.darkTint[6],
      border: palette.red[90],
      borderHovered: palette.red[80],
      borderPressed: palette.red[70],
      borderDisabled: palette.darkTint[9],
      text: palette.white,
      textDisabled: palette.darkTint[45],
      focusBorder: palette.white,
      focusOutline: palette.red[90],
    },
    positive: {
      background: palette.green[90],
      backgroundHovered: palette.green[80],
      backgroundPressed: palette.green[70],
      backgroundDisabled: palette.darkTint[6],
      border: palette.green[90],
      borderHovered: palette.green[80],
      borderPressed: palette.green[70],
      borderDisabled: palette.darkTint[9],
      text: palette.white,
      textDisabled: palette.darkTint[45],
      focusBorder: palette.white,
      focusOutline: palette.green[90],
    },
    warning: {
      background: palette.yellow[90],
      backgroundHovered: palette.yellow[80],
      backgroundPressed: palette.yellow[70],
      backgroundDisabled: palette.darkTint[6],
      border: palette.yellow[90],
      borderHovered: palette.yellow[80],
      borderPressed: palette.yellow[70],
      borderDisabled: palette.darkTint[9],
      text: palette.white,
      textDisabled: palette.darkTint[45],
      focusBorder: palette.white,
      focusOutline: palette.yellow[90],
    },
  },
  
  // Input field colors
  inputField: {
    background: palette.transparent,
    backgroundHovered: palette.transparent,
    backgroundDisabled: palette.darkTint[6],
    backgroundError: palette.transparent,
    border: palette.darkTint[18],
    borderHovered: palette.darkTint[18],
    borderDisabled: palette.darkTint[9],
    borderError: palette.red[100],
    text: palette.neutral[10],
    textHovered: palette.neutral[10],
    textDisabled: palette.darkTint[45],
    textError: palette.neutral[10],
    caret: palette.neutral[10],
    caretError: palette.neutral[10],
    focusBorder: palette.blue[100],
    focusBorderError: palette.red[100],
    focusBorderPositive: palette.green[100],
    focusOutline: palette.blue[130],
    focusOutlineError: palette.red[130],
    focusOutlinePositive: palette.green[130],
    hint: palette.neutral[90],
    hintHovered: palette.neutral[90],
    hintDisabled: palette.neutral[110],
    hintError: palette.neutral[90],
    selectionBackground: palette.blue[130],
    selectionBackgroundError: palette.blue[130],
  },
  
  // List item colors
  listItem: {
    background: palette.transparent,
    backgroundHovered: palette.darkTint[5],
    backgroundSelected: palette.darkTint[13],
    backgroundFocused: palette.blueTint[20],
    text: palette.neutral[10],
    textHovered: palette.neutral[10],
    textSelected: palette.neutral[10],
    textFocused: palette.neutral[10],
    textSecondary: palette.darkTint[54],
    border: palette.transparent,
    borderHovered: palette.transparent,
    borderSelected: palette.transparent,
    borderFocused: palette.transparent,
    focusBorder: palette.blue[100],
  },
  
  // Popup colors
  popup: {
    background: palette.white,
    border: palette.darkTint[13],
    text: palette.neutral[10],
    separator: palette.darkTint[9],
  },
  
  // Shadow colors
  shadow: {
    small: '#2D2D2D1F',
    medium: '#2D2D2D1F',
    large: '#2D2D2D1F',
    border: '#2D2D2D33',
  },
} as const;

// Semantic color tokens for dark theme
export const darkColors = {
  // Text colors
  textPrimary: palette.neutral[140],
  textSecondary: palette.lightTint[52],
  textTertiary: palette.lightTint[35],
  textPositive: palette.green[110],
  textDangerous: palette.red[110],
  textWarning: palette.yellow[110],
  textDisabled: palette.lightTint[35],
  textBright: palette.white,
  textAccent: palette.blue[110],
  
  // Background colors
  backgroundPrimary: palette.neutral[10],
  backgroundSecondary: palette.neutral[30],
  
  // Border colors
  border: palette.lightTint[13],
  borderFocused: palette.blue[100],
  focusOutline: palette.blue[50],
  
  // Button colors
  button: {
    primary: {
      background: palette.blue[90],
      backgroundHovered: palette.blue[80],
      backgroundPressed: palette.blue[70],
      backgroundDisabled: palette.transparent,
      border: palette.blue[90],
      borderHovered: palette.blue[80],
      borderPressed: palette.blue[70],
      borderDisabled: palette.lightTint[11],
      text: palette.white,
      textDisabled: palette.lightTint[35],
      focusBorder: palette.neutral[20],
      focusOutline: palette.blue[90],
    },
    secondary: {
      background: palette.lightTint[13],
      backgroundHovered: palette.lightTint[11],
      backgroundPressed: palette.lightTint[9],
      backgroundDisabled: palette.transparent,
      border: palette.transparent,
      borderHovered: palette.transparent,
      borderPressed: palette.transparent,
      borderDisabled: palette.lightTint[11],
      text: palette.neutral[140],
      textDisabled: palette.lightTint[35],
      focusBorder: palette.blue[100],
      focusOutline: palette.blue[50],
    },
    dangerous: {
      background: palette.red[90],
      backgroundHovered: palette.red[80],
      backgroundPressed: palette.red[70],
      backgroundDisabled: palette.transparent,
      border: palette.red[90],
      borderHovered: palette.red[80],
      borderPressed: palette.red[70],
      borderDisabled: palette.lightTint[11],
      text: palette.white,
      textDisabled: palette.lightTint[35],
      focusBorder: palette.neutral[20],
      focusOutline: palette.red[90],
    },
    positive: {
      background: palette.green[90],
      backgroundHovered: palette.green[80],
      backgroundPressed: palette.green[70],
      backgroundDisabled: palette.transparent,
      border: palette.green[90],
      borderHovered: palette.green[80],
      borderPressed: palette.green[70],
      borderDisabled: palette.lightTint[11],
      text: palette.white,
      textDisabled: palette.lightTint[35],
      focusBorder: palette.neutral[20],
      focusOutline: palette.green[90],
    },
    warning: {
      background: palette.yellow[90],
      backgroundHovered: palette.yellow[80],
      backgroundPressed: palette.yellow[70],
      backgroundDisabled: palette.transparent,
      border: palette.yellow[90],
      borderHovered: palette.yellow[80],
      borderPressed: palette.yellow[70],
      borderDisabled: palette.lightTint[11],
      text: palette.white,
      textDisabled: palette.lightTint[35],
      focusBorder: palette.neutral[20],
      focusOutline: palette.yellow[90],
    },
  },
  
  // Input field colors
  inputField: {
    background: palette.transparent,
    backgroundHovered: palette.transparent,
    backgroundDisabled: palette.lightTint[11],
    backgroundError: palette.transparent,
    border: palette.lightTint[13],
    borderHovered: palette.lightTint[13],
    borderDisabled: palette.lightTint[9],
    borderError: palette.red[100],
    text: palette.neutral[140],
    textHovered: palette.neutral[140],
    textDisabled: palette.lightTint[35],
    textError: palette.neutral[140],
    caret: palette.neutral[140],
    caretError: palette.neutral[140],
    focusBorder: palette.blue[100],
    focusBorderError: palette.red[100],
    focusBorderPositive: palette.green[100],
    focusOutline: palette.blue[50],
    focusOutlineError: palette.red[50],
    focusOutlinePositive: palette.green[50],
    hint: palette.neutral[110],
    hintHovered: palette.neutral[110],
    hintDisabled: palette.neutral[80],
    hintError: palette.neutral[110],
    selectionBackground: palette.blue[50],
    selectionBackgroundError: palette.blue[50],
  },
  
  // List item colors
  listItem: {
    background: palette.transparent,
    backgroundHovered: palette.lightTint[4],
    backgroundSelected: palette.lightTint[13],
    backgroundFocused: palette.blueTint[40],
    text: palette.neutral[140],
    textHovered: palette.neutral[140],
    textSelected: palette.neutral[140],
    textFocused: palette.neutral[140],
    textSecondary: palette.lightTint[52],
    border: palette.transparent,
    borderHovered: palette.transparent,
    borderSelected: palette.transparent,
    borderFocused: palette.transparent,
    focusBorder: palette.blue[100],
  },
  
  // Popup colors
  popup: {
    background: palette.neutral[30],
    border: palette.lightTint[13],
    text: palette.neutral[140],
    separator: palette.lightTint[9],
  },
  
  // Shadow colors
  shadow: {
    small: '#00000040',
    medium: '#000000D9',
    large: '#000000D9',
    border: palette.black,
  },
} as const;

// Theme configuration
export type Theme = 'light' | 'dark';

export const themes = {
  light: lightColors,
  dark: darkColors,
} as const;

// Type definitions
export type ColorToken = keyof typeof lightColors;
export type PaletteColor = keyof typeof palette;

// Utility functions
export function getThemeColors(theme: Theme) {
  return themes[theme];
}

export function createCSSVariables(theme: Theme) {
  const colors = getThemeColors(theme);
  const cssVars: Record<string, string> = {};
  
  // Helper function to flatten nested objects
  function flattenColors(obj: any, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'string') {
        result[`--color-${varName}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(result, flattenColors(value, varName));
      }
    }
    
    return result;
  }
  
  return flattenColors(colors);
}

// Fleet-style color utilities for Radix components
export const radixColors = {
  // Create Radix-compatible color scales
  gray: Object.entries(palette.neutral).reduce((acc, [key, value]) => {
    acc[`gray${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  blue: Object.entries(palette.blue).reduce((acc, [key, value]) => {
    acc[`blue${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  green: Object.entries(palette.green).reduce((acc, [key, value]) => {
    acc[`green${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  red: Object.entries(palette.red).reduce((acc, [key, value]) => {
    acc[`red${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  yellow: Object.entries(palette.yellow).reduce((acc, [key, value]) => {
    acc[`yellow${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  violet: Object.entries(palette.violet).reduce((acc, [key, value]) => {
    acc[`violet${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
  
  purple: Object.entries(palette.purple).reduce((acc, [key, value]) => {
    acc[`purple${key}`] = value;
    return acc;
  }, {} as Record<string, string>),
}; 