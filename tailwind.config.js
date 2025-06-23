const { fontFamily } = require("tailwindcss/defaultTheme")

const palette = {
  Neutral_10: "#1E1E1E",
  Neutral_20: "#323232",
  Neutral_30: "#454545",
  Neutral_40: "#555555",
  Neutral_50: "#646464",
  Neutral_60: "#747474",
  Neutral_70: "#8B8B8B",
  Neutral_80: "#A3A3A3",
  Neutral_90: "#B9B9B9",
  Neutral_100: "#CCCCCC",
  Neutral_110: "#DEDEDE",
  Neutral_120: "#E6E6E6",
  Neutral_130: "#EDEDED",
  Neutral_140: "#F3F3F3",
  Neutral_150: "#FAFAFA",
  Neutral_160: "#FFFFFF",
  DarkTint_3: "rgba(25, 26, 27, 0.03)",
  DarkTint_5: "rgba(25, 26, 27, 0.05)",
  DarkTint_6: "rgba(25, 26, 27, 0.06)",
  DarkTint_9: "rgba(25, 26, 27, 0.09)",
  DarkTint_18: "rgba(25, 26, 27, 0.18)",
  DarkTint_27: "rgba(25, 26, 27, 0.27)",
  DarkTint_45: "rgba(25, 26, 27, 0.45)",
  DarkTint_54: "rgba(25, 26, 27, 0.54)",
  LightTint_4: "rgba(251, 251, 251, 0.04)",
  LightTint_9: "rgba(251, 251, 251, 0.09)",
  LightTint_11: "rgba(251, 251, 251, 0.11)",
  LightTint_13: "rgba(251, 251, 251, 0.13)",
  LightTint_17: "rgba(251, 251, 251, 0.17)",
  LightTint_26: "rgba(251, 251, 251, 0.26)",
  LightTint_35: "rgba(251, 251, 251, 0.35)",
  LightTint_52: "rgba(251, 251, 251, 0.52)",
  LightTint_69: "rgba(251, 251, 251, 0.69)",
  Accent_30: "#2B3E52",
  Accent_50: "#376495",
  Accent_70: "#3673B9",
  Accent_80: "#367BDD",
  Accent_90: "#4A90E2",
  Accent_100: "#6EACF3",
  Accent_120: "#94C4F7",
  Accent_130: "#A9D0F9",
  Accent_150: "#E3F0FD",
  Red_30: "#5B2C34",
  Red_60: "#B95868",
  Red_70: "#D34059",
  Red_80: "#F0526E",
  Red_90: "#FF6680",
  Red_110: "#FF99A9",
  Red_120: "#FFB3BF",
  Red_150: "#FFE6EA",
  Yellow_30: "#604118",
  Yellow_60: "#B57B2F",
  Yellow_70: "#D99037",
  Yellow_80: "#F2A23A",
  Yellow_90: "#FFB03B",
  Yellow_120: "#FFD082",
  Yellow_150: "#FFF2DA",
  Green_30: "#2E4839",
  Green_60: "#598B6D",
  Green_70: "#51A473",
  Green_80: "#59C184",
  Green_90: "#62E599",
  Green_110: "#96EBB6",
  Green_120: "#B3F2CE",
  Green_150: "#E6F9EF",
  Violet_30: "#44325B",
  Violet_60: "#8060A9",
  Violet_70: "#986DD1",
  Violet_80: "#B183F2",
  Violet_90: "#C29FFF",
  Violet_110: "#D9BFFF",
  Violet_120: "#E5D1FF",
  Violet_150: "#F6F0FF",
  White: "#FFFFFF",
  Transparent: "transparent",
  AccentBackgroundDark: "#26282E",
  AccentBackgroundSecondaryDark: "#2B2D33",
  AccentIslandDark: "#202226",
  AccentBackgroundLight: "#FCFCFC",
  AccentBackgroundSecondaryLight: "#F2F2F2",
  AccentIslandLight: "#EBEBEB",
};

const lightThemeColors = {
  text: {
    primary: palette.Neutral_10,
    secondary: palette.DarkTint_54,
    tertiary: palette.DarkTint_45,
    positive: palette.Green_80,
    dangerous: palette.Red_80,
    disabled: palette.DarkTint_45,
    bright: palette.Neutral_10,
    ai: palette.Violet_80,
  },
  background: {
    primary: palette.AccentBackgroundLight,
    secondary: palette.AccentBackgroundSecondaryLight,
  },
  border: {
    default: palette.DarkTint_18,
    focused: palette.Accent_100,
  },
  focusOutline: palette.Accent_130,
  banner: {
    text: palette.Neutral_10,
    background: {
      info: palette.Accent_150,
      dangerous: palette.Red_150,
      warning: palette.Yellow_150,
      positive: palette.Green_150,
      ai: palette.Violet_150,
      inline: palette.DarkTint_9,
    },
    border: {
      info: palette.Accent_120,
      dangerous: palette.Red_120,
      warning: palette.Yellow_120,
      positive: palette.Green_120,
      ai: palette.Violet_120,
    },
    secondary: {
      background: {
        error: "rgba(199, 44, 73, 0.15)",
      },
    },
    inline: {
      background: palette.DarkTint_6,
      border: palette.Transparent,
      text: palette.Neutral_10,
    },
  },
  button: {
    dangerous: {
      background: {
        default: palette.Red_90,
        disabled: palette.DarkTint_6,
        hovered: palette.Red_80,
        pressed: palette.Red_70,
      },
      border: {
        default: palette.Red_90,
        disabled: palette.DarkTint_9,
        hovered: palette.Red_80,
        pressed: palette.Red_70,
      },
      focusBorder: palette.White,
      focusOutline: palette.Red_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.DarkTint_18,
      },
      split: {
        focusOutline: palette.Red_120,
      },
      text: {
        default: palette.White,
        disabled: palette.DarkTint_45,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    positive: {
      background: {
        default: palette.Green_90,
        disabled: palette.DarkTint_6,
        hovered: palette.Green_80,
        pressed: palette.Green_70,
      },
      border: {
        default: palette.Green_90,
        disabled: palette.DarkTint_9,
        hovered: palette.Green_80,
        pressed: palette.Green_70,
      },
      focusBorder: palette.White,
      focusOutline: palette.Green_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.DarkTint_18,
      },
      split: {
        focusOutline: palette.Green_120,
      },
      text: {
        default: palette.White,
        disabled: palette.DarkTint_45,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    primary: {
      background: {
        default: palette.Accent_90,
        disabled: palette.DarkTint_6,
        hovered: palette.Accent_80,
        pressed: palette.Accent_70,
      },
      border: {
        default: palette.Accent_90,
        disabled: palette.DarkTint_9,
        hovered: palette.Accent_80,
        pressed: palette.Accent_70,
      },
      focusBorder: palette.White,
      focusOutline: palette.Accent_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.DarkTint_18,
      },
      split: {
        focusOutline: palette.Accent_120,
      },
      text: {
        default: palette.White,
        disabled: palette.DarkTint_45,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    secondary: {
      background: {
        default: palette.Transparent,
        disabled: palette.DarkTint_6,
        hovered: palette.DarkTint_3,
        pressed: palette.DarkTint_6,
      },
      border: {
        default: palette.DarkTint_18,
        disabled: palette.DarkTint_9,
        hovered: palette.DarkTint_18,
        pressed: palette.DarkTint_18,
      },
      focusBorder: palette.Accent_100,
      focusOutline: palette.Accent_130,
      separator: {
        default: palette.DarkTint_18,
        disabled: palette.DarkTint_18,
      },
      split: {
        focusOutline: palette.Accent_130,
      },
      text: {
        default: palette.Neutral_10,
        disabled: palette.DarkTint_45,
        hovered: palette.Neutral_10,
        pressed: palette.Neutral_10,
        hint: palette.DarkTint_54,
      },
    },
    warning: {
      background: {
        default: palette.Yellow_90,
        disabled: palette.DarkTint_6,
        hovered: palette.Yellow_80,
        pressed: palette.Yellow_70,
      },
      border: {
        default: palette.Yellow_90,
        disabled: palette.DarkTint_9,
        hovered: palette.Yellow_80,
        pressed: palette.Yellow_70,
      },
      focusBorder: palette.White,
      focusOutline: palette.Yellow_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.DarkTint_18,
      },
      split: {
        focusOutline: palette.Yellow_120,
      },
      text: {
        default: palette.White,
        disabled: palette.DarkTint_45,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    ai: {
      background: {
        default: palette.Violet_90,
        disabled: palette.DarkTint_6,
        hovered: palette.Violet_80,
        pressed: palette.Violet_70,
      },
      border: {
        default: palette.Violet_90,
        disabled: palette.DarkTint_9,
        hovered: palette.Violet_80,
        pressed: palette.Violet_70,
      },
      focusBorder: palette.White,
      focusOutline: palette.Violet_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.DarkTint_18,
      },
      split: {
        focusOutline: palette.Violet_120,
      },
      text: {
        default: palette.White,
        disabled: palette.DarkTint_45,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
  },
  chat: {
    message: {
      user: {
        background: {
          default: palette.Neutral_150,
          hovered: palette.Neutral_160,
          edited: palette.Transparent,
        },
        border: {
          default: palette.Transparent,
          hovered: palette.Neutral_140,
          edited: palette.Violet_90,
        },
      },
      ai: {
        background: {
          default: palette.Transparent,
          hovered: palette.DarkTint_3,
        },
        border: {
          default: palette.Transparent,
          hovered: palette.Transparent,
        },
      },
    },
    widget: {
      background: {
        default: palette.Neutral_150,
        hovered: palette.Neutral_140,
      },
      border: {
        default: palette.Transparent,
        hovered: palette.Transparent,
      },
    },
  },
  checkbox: {
    icon: {
      default: palette.White,
      disabled: palette.DarkTint_27,
    },
    text: {
      default: palette.Neutral_10,
      disabled: palette.DarkTint_45,
    },
    off: {
      background: {
        default: palette.Transparent,
        disabled: palette.Transparent,
        hovered: palette.Transparent,
      },
      border: {
        default: palette.DarkTint_27,
        hovered: palette.DarkTint_27,
        disabled: palette.DarkTint_18,
      },
      focusBorder: palette.Accent_100,
      focusOutline: palette.Accent_130,
    },
    on: {
      background: {
        default: palette.Accent_90,
        disabled: palette.DarkTint_9,
        hovered: palette.Accent_90,
      },
      border: {
        default: palette.Transparent,
        disabled: palette.DarkTint_9,
        hovered: palette.Transparent,
      },
      focusBorder: palette.AccentIslandLight,
      focusOutline: palette.Accent_90,
    },
  },
};

const darkThemeColors = {
  text: {
    primary: palette.Neutral_140,
    secondary: palette.LightTint_52,
    tertiary: palette.LightTint_35,
    positive: palette.Green_110,
    dangerous: palette.Red_110,
    disabled: palette.LightTint_35,
    bright: palette.White,
    ai: palette.Violet_110,
  },
  background: {
    primary: palette.AccentBackgroundDark,
    secondary: palette.AccentBackgroundSecondaryDark,
  },
  border: {
    default: palette.LightTint_13,
    focused: palette.Accent_100,
  },
  focusOutline: palette.Accent_50,
  banner: {
    text: palette.Neutral_140,
    background: {
      info: palette.Accent_30,
      dangerous: palette.Red_30,
      warning: palette.Yellow_30,
      positive: palette.Green_30,
      ai: palette.Violet_30,
      inline: palette.LightTint_9,
    },
    border: {
      info: palette.Accent_60,
      dangerous: palette.Red_60,
      warning: palette.Yellow_60,
      positive: palette.Green_60,
      ai: palette.Violet_60,
    },
    secondary: {
      background: {
        error: palette.DarkTint_54,
      },
    },
    inline: {
      background: palette.LightTint_9,
      border: palette.Transparent,
      text: palette.Neutral_140,
    },
  },
  button: {
    dangerous: {
      background: {
        default: palette.Red_90,
        disabled: palette.Transparent,
        hovered: palette.Red_80,
        pressed: palette.Red_70,
      },
      border: {
        default: palette.Red_90,
        disabled: palette.LightTint_11,
        hovered: palette.Red_80,
        pressed: palette.Red_70,
      },
      focusBorder: palette.AccentIslandDark,
      focusOutline: palette.Red_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.LightTint_13,
      },
      split: {
        focusOutline: palette.Red_120,
      },
      text: {
        default: palette.White,
        disabled: palette.LightTint_35,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    positive: {
      background: {
        default: palette.Green_90,
        disabled: palette.Transparent,
        hovered: palette.Green_80,
        pressed: palette.Green_70,
      },
      border: {
        default: palette.Green_90,
        disabled: palette.LightTint_11,
        hovered: palette.Green_80,
        pressed: palette.Green_70,
      },
      focusBorder: palette.AccentIslandDark,
      focusOutline: palette.Green_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.LightTint_13,
      },
      split: {
        focusOutline: palette.Green_120,
      },
      text: {
        default: palette.White,
        disabled: palette.LightTint_35,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    primary: {
      background: {
        default: palette.Accent_90,
        disabled: palette.Transparent,
        hovered: palette.Accent_80,
        pressed: palette.Accent_70,
      },
      border: {
        default: palette.Accent_90,
        disabled: palette.LightTint_11,
        hovered: palette.Accent_80,
        pressed: palette.Accent_70,
      },
      focusBorder: palette.AccentIslandDark,
      focusOutline: palette.Accent_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.LightTint_13,
      },
      split: {
        focusOutline: palette.Accent_120,
      },
      text: {
        default: palette.White,
        disabled: palette.LightTint_35,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    secondary: {
      background: {
        default: palette.LightTint_13,
        disabled: palette.Transparent,
        hovered: palette.LightTint_11,
        pressed: palette.LightTint_9,
      },
      border: {
        default: palette.Transparent,
        disabled: palette.LightTint_11,
        hovered: palette.Transparent,
        pressed: palette.Transparent,
      },
      focusBorder: palette.Accent_100,
      focusOutline: palette.Accent_50,
      separator: {
        default: palette.LightTint_17,
        disabled: palette.LightTint_13,
      },
      split: {
        focusOutline: palette.Accent_50,
      },
      text: {
        default: palette.Neutral_140,
        disabled: palette.LightTint_35,
        hovered: palette.Neutral_140,
        pressed: palette.Neutral_140,
        hint: palette.LightTint_52,
      },
    },
    warning: {
      background: {
        default: palette.Yellow_90,
        disabled: palette.Transparent,
        hovered: palette.Yellow_80,
        pressed: palette.Yellow_70,
      },
      border: {
        default: palette.Yellow_90,
        disabled: palette.LightTint_11,
        hovered: palette.Yellow_80,
        pressed: palette.Yellow_70,
      },
      focusBorder: palette.AccentIslandDark,
      focusOutline: palette.Yellow_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.LightTint_13,
      },
      split: {
        focusOutline: palette.Yellow_120,
      },
      text: {
        default: palette.White,
        disabled: palette.LightTint_35,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
    ai: {
      background: {
        default: palette.Violet_90,
        disabled: palette.Transparent,
        hovered: palette.Violet_80,
        pressed: palette.Violet_70,
      },
      border: {
        default: palette.Violet_90,
        disabled: palette.LightTint_11,
        hovered: palette.Violet_80,
        pressed: palette.Violet_70,
      },
      focusBorder: palette.AccentIslandDark,
      focusOutline: palette.Violet_90,
      separator: {
        default: palette.LightTint_26,
        disabled: palette.LightTint_13,
      },
      split: {
        focusOutline: palette.Violet_120,
      },
      text: {
        default: palette.White,
        disabled: palette.LightTint_35,
        hovered: palette.White,
        pressed: palette.White,
        hint: palette.LightTint_69,
      },
    },
  },
  chat: {
    message: {
      user: {
        background: {
          default: palette.Neutral_40,
          hovered: palette.Neutral_30,
          edited: palette.Transparent,
        },
        border: {
          default: palette.Transparent,
          hovered: palette.Neutral_50,
          edited: palette.Violet_90,
        },
      },
      ai: {
        background: {
          default: palette.Transparent,
          hovered: palette.LightTint_4,
        },
        border: {
          default: palette.Transparent,
          hovered: palette.Transparent,
        },
      },
    },
    widget: {
      background: {
        default: palette.Neutral_30,
        hovered: palette.Neutral_40,
      },
      border: {
        default: palette.Transparent,
        hovered: palette.Transparent,
      },
    },
  },
  checkbox: {
    icon: {
      default: palette.White,
      disabled: palette.LightTint_35,
    },
    text: {
      default: palette.Neutral_140,
      disabled: palette.LightTint_35,
    },
    off: {
      background: {
        default: palette.Transparent,
        disabled: palette.Transparent,
        hovered: palette.Transparent,
      },
      border: {
        default: palette.LightTint_26,
        disabled: palette.LightTint_17,
        hovered: palette.LightTint_26,
      },
      focusBorder: palette.Accent_100,
      focusOutline: palette.Accent_50,
    },
    on: {
      background: {
        default: palette.Accent_90,
        disabled: palette.LightTint_13,
        hovered: palette.Accent_90,
      },
      border: {
        default: palette.Transparent,
        hovered: palette.Transparent,
        disabled: palette.LightTint_9,
      },
      focusBorder: palette.AccentIslandDark,
      focusOutline: palette.Accent_90,
    },
  },
};

function flattenThemeColors(theme) {
  const flattened = {};

  function flatten(obj, path = "") {
    for (const key in obj) {
      const newPath = path ? `${path}-${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flatten(obj[key], newPath);
      } else {
        flattened[newPath] = obj[key];
      }
    }
  }

  flatten(theme);
  return flattened;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...palette,
        light: flattenThemeColors(lightThemeColors),
        dark: flattenThemeColors(darkThemeColors),
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}