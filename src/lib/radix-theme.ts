/**
 * Radix UI Theme Configuration for Fleet Air Web Components
 * Maps Fleet's color system to Radix UI theming patterns
 */

import { palette, type Theme } from './colors';

// Radix UI expects color scales from 1-12
// We'll map our Fleet color scales to this format
export const radixColorScales = {
  // Gray scale (neutral)
  gray: {
    gray1: palette.neutral[160],   // Lightest
    gray2: palette.neutral[150],
    gray3: palette.neutral[140],
    gray4: palette.neutral[130],
    gray5: palette.neutral[120],
    gray6: palette.neutral[110],
    gray7: palette.neutral[100],
    gray8: palette.neutral[90],
    gray9: palette.neutral[80],
    gray10: palette.neutral[70],
    gray11: palette.neutral[60],
    gray12: palette.neutral[10],   // Darkest
  },
  
  // Blue scale (accent)
  blue: {
    blue1: palette.blue[160],
    blue2: palette.blue[150],
    blue3: palette.blue[140],
    blue4: palette.blue[130],
    blue5: palette.blue[120],
    blue6: palette.blue[110],
    blue7: palette.blue[100],
    blue8: palette.blue[90],
    blue9: palette.blue[80],
    blue10: palette.blue[70],
    blue11: palette.blue[60],
    blue12: palette.blue[10],
  },
  
  // Green scale (success)
  green: {
    green1: palette.green[160],
    green2: palette.green[150],
    green3: palette.green[140],
    green4: palette.green[130],
    green5: palette.green[120],
    green6: palette.green[110],
    green7: palette.green[100],
    green8: palette.green[90],
    green9: palette.green[80],
    green10: palette.green[70],
    green11: palette.green[60],
    green12: palette.green[10],
  },
  
  // Red scale (error/danger)
  red: {
    red1: palette.red[160],
    red2: palette.red[150],
    red3: palette.red[140],
    red4: palette.red[130],
    red5: palette.red[120],
    red6: palette.red[110],
    red7: palette.red[100],
    red8: palette.red[90],
    red9: palette.red[80],
    red10: palette.red[70],
    red11: palette.red[60],
    red12: palette.red[10],
  },
  
  // Yellow scale (warning)
  yellow: {
    yellow1: palette.yellow[160],
    yellow2: palette.yellow[150],
    yellow3: palette.yellow[140],
    yellow4: palette.yellow[130],
    yellow5: palette.yellow[120],
    yellow6: palette.yellow[110],
    yellow7: palette.yellow[100],
    yellow8: palette.yellow[90],
    yellow9: palette.yellow[80],
    yellow10: palette.yellow[70],
    yellow11: palette.yellow[60],
    yellow12: palette.yellow[10],
  },
  
  // Violet scale
  violet: {
    violet1: palette.violet[160],
    violet2: palette.violet[150],
    violet3: palette.violet[140],
    violet4: palette.violet[130],
    violet5: palette.violet[120],
    violet6: palette.violet[110],
    violet7: palette.violet[100],
    violet8: palette.violet[90],
    violet9: palette.violet[80],
    violet10: palette.violet[70],
    violet11: palette.violet[60],
    violet12: palette.violet[10],
  },
  
  // Purple scale
  purple: {
    purple1: palette.purple[160],
    purple2: palette.purple[150],
    purple3: palette.purple[140],
    purple4: palette.purple[130],
    purple5: palette.purple[120],
    purple6: palette.purple[110],
    purple7: palette.purple[100],
    purple8: palette.purple[90],
    purple9: palette.purple[80],
    purple10: palette.purple[70],
    purple11: palette.purple[60],
    purple12: palette.purple[10],
  },
} as const;

// Create CSS variables for Radix theming
export function createRadixCSSVariables(theme: Theme) {
  const isDark = theme === 'dark';
  const variables: Record<string, string> = {};
  
  // Map our color scales to Radix naming conventions
  Object.entries(radixColorScales).forEach(([colorName, scale]) => {
    Object.entries(scale).forEach(([step, value]) => {
      variables[`--${step.replace(/\d+/, '')}-${step.match(/\d+/)?.[0]}`] = value;
    });
  });
  
  // Semantic token mapping for Radix components
  if (isDark) {
    // Dark theme semantic tokens
    variables['--color-background'] = palette.neutral[10];
    variables['--color-panel-solid'] = palette.neutral[30];
    variables['--color-panel-translucent'] = palette.lightTint[13];
    variables['--color-overlay'] = palette.darkTint[60];
    variables['--color-surface'] = palette.neutral[20];
    
    // Text colors
    variables['--color-text-primary'] = palette.neutral[140];
    variables['--color-text-secondary'] = palette.lightTint[52];
    variables['--color-text-low-contrast'] = palette.lightTint[35];
    
    // Border and focus
    variables['--color-border-default'] = palette.lightTint[13];
    variables['--color-border-hover'] = palette.lightTint[26];
    variables['--color-focus-root'] = palette.blue[100];
    
    // Component specific
    variables['--color-selection'] = palette.blue[50];
    variables['--color-accent-9'] = palette.blue[90];
    variables['--color-accent-11'] = palette.blue[110];
  } else {
    // Light theme semantic tokens
    variables['--color-background'] = palette.neutral[150];
    variables['--color-panel-solid'] = palette.white;
    variables['--color-panel-translucent'] = palette.darkTint[6];
    variables['--color-overlay'] = palette.darkTint[45];
    variables['--color-surface'] = palette.neutral[160];
    
    // Text colors
    variables['--color-text-primary'] = palette.neutral[10];
    variables['--color-text-secondary'] = palette.darkTint[54];
    variables['--color-text-low-contrast'] = palette.darkTint[45];
    
    // Border and focus
    variables['--color-border-default'] = palette.darkTint[18];
    variables['--color-border-hover'] = palette.darkTint[27];
    variables['--color-focus-root'] = palette.blue[100];
    
    // Component specific
    variables['--color-selection'] = palette.blue[130];
    variables['--color-accent-9'] = palette.blue[90];
    variables['--color-accent-11'] = palette.blue[100];
  }
  
  return variables;
}

// Radix UI component variants using Fleet colors
export const fleetRadixVariants = {
  button: {
    primary: {
      backgroundColor: 'var(--color-accent-9)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--blue-8)',
      },
      '&:active': {
        backgroundColor: 'var(--blue-7)',
      },
      '&:focus-visible': {
        outline: '2px solid var(--color-focus-root)',
        outlineOffset: '2px',
      },
    },
    secondary: {
      backgroundColor: 'var(--color-panel-translucent)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border-default)',
      '&:hover': {
        backgroundColor: 'var(--gray-3)',
        borderColor: 'var(--color-border-hover)',
      },
      '&:focus-visible': {
        outline: '2px solid var(--color-focus-root)',
        outlineOffset: '2px',
      },
    },
    danger: {
      backgroundColor: 'var(--red-9)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--red-8)',
      },
      '&:active': {
        backgroundColor: 'var(--red-7)',
      },
    },
    success: {
      backgroundColor: 'var(--green-9)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--green-8)',
      },
      '&:active': {
        backgroundColor: 'var(--green-7)',
      },
    },
    warning: {
      backgroundColor: 'var(--yellow-9)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'var(--yellow-8)',
      },
      '&:active': {
        backgroundColor: 'var(--yellow-7)',
      },
    },
  },
  
  input: {
    default: {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border-default)',
      color: 'var(--color-text-primary)',
      '&::placeholder': {
        color: 'var(--color-text-low-contrast)',
      },
      '&:hover': {
        borderColor: 'var(--color-border-hover)',
      },
      '&:focus': {
        borderColor: 'var(--color-focus-root)',
        outline: '2px solid var(--blue-4)',
        outlineOffset: '-1px',
      },
    },
    error: {
      borderColor: 'var(--red-7)',
      '&:focus': {
        borderColor: 'var(--red-8)',
        outline: '2px solid var(--red-4)',
      },
    },
  },
  
  card: {
    default: {
      backgroundColor: 'var(--color-panel-solid)',
      border: '1px solid var(--color-border-default)',
      borderRadius: '8px',
      boxShadow: '0 2px 8px var(--color-overlay)',
    },
    elevated: {
      backgroundColor: 'var(--color-panel-solid)',
      border: '1px solid var(--color-border-default)',
      borderRadius: '8px',
      boxShadow: '0 4px 16px var(--color-overlay)',
    },
  },
} as const;

// Helper to apply Radix theme
export function applyRadixTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const variables = createRadixCSSVariables(theme);
  
  // Apply CSS variables
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Set theme class for Radix
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  
  // Set radix theme attribute
  root.setAttribute('data-theme', theme);
} 