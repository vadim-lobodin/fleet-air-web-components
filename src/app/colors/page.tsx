"use client";
import React from "react";
import { Typography } from "@/components/ui/typography"

// Complete Fleet color palette extracted from theme files
const paletteColors = {
  // Neutrals
  neutral: {
    White: "#FFFFFF",
    Black: "#000000", 
    Neutral_160: "#F8F8F9",
    Neutral_150: "#EEEFF0",
    Neutral_140: "#E0E1E4",
    Neutral_130: "#C3C5C9",
    Neutral_120: "#9EA3A8",
    Neutral_110: "#898E94",
    Neutral_100: "#7A7F86",
    Neutral_90: "#6E747B",
    Neutral_80: "#646B71",
    Neutral_70: "#5D636B",
    Neutral_60: "#4C5157",
    Neutral_50: "#3E4147",
    Neutral_40: "#323438",
    Neutral_30: "#252629",
    Neutral_20: "#18191B",
    Neutral_10: "#090909",
  },

  // Blues (Accent)
  blue: {
    Blue_160: "#F7F8FE",
    Blue_150: "#E9EFFC", 
    Blue_140: "#D6E3F9",
    Blue_130: "#A8C6F4",
    Blue_120: "#71A3EF",
    Blue_110: "#4B8DEC",
    Blue_100: "#2A7DEB",
    Blue_90: "#0870E4",
    Blue_80: "#1868CB",
    Blue_70: "#1D61BA",
    Blue_60: "#225090",
    Blue_50: "#224271",
    Blue_40: "#1E3455",
    Blue_30: "#18263C",
    Blue_20: "#111926",
    Blue_10: "#06090F",
  },

  // Greens
  green: {
    Green_160: "#F5FAF5",
    Green_150: "#E6F2EA",
    Green_140: "#D2E7DB",
    Green_130: "#A3CEB8",
    Green_120: "#69B090",
    Green_110: "#409D78",
    Green_100: "#169068",
    Green_90: "#14835E",
    Green_80: "#1E7857",
    Green_70: "#216F52",
    Green_60: "#255A44",
    Green_50: "#234939",
    Green_40: "#1F392D",
    Green_30: "#182921",
    Green_20: "#111B16",
    Green_10: "#060A08",
  },

  // Reds
  red: {
    Red_160: "#FFF8F8",
    Red_150: "#FFE9EA",
    Red_140: "#FFD8DA",
    Red_130: "#FFB0B5",
    Red_120: "#F87C88",
    Red_110: "#EC5D6F",
    Red_100: "#E1465E",
    Red_90: "#D73251",
    Red_80: "#C72C49",
    Red_70: "#B82D46",
    Red_60: "#922C3B",
    Red_50: "#742831",
    Red_40: "#592228",
    Red_30: "#401A1E",
    Red_20: "#291214",
    Red_10: "#100607",
  },

  // Yellows
  yellow: {
    Yellow_160: "#FFF8EF",
    Yellow_150: "#FCEDDC",
    Yellow_140: "#F5DEC2",
    Yellow_130: "#E5BF8C",
    Yellow_120: "#CD984D",
    Yellow_110: "#BD8128",
    Yellow_100: "#B07203",
    Yellow_90: "#9F680C",
    Yellow_80: "#916012",
    Yellow_70: "#865A15",
    Yellow_60: "#6C4B18",
    Yellow_50: "#573D18",
    Yellow_40: "#433016",
    Yellow_30: "#302412",
    Yellow_20: "#20180C",
    Yellow_10: "#0C0805",
  },

  // Violets
  violet: {
    Violet_160: "#F9F7FE",
    Violet_150: "#EEEDFD",
    Violet_140: "#DEDFFC",
    Violet_130: "#BDC0FA",
    Violet_120: "#9599F9",
    Violet_110: "#7F80F9",
    Violet_100: "#726CF9",
    Violet_90: "#685AFB",
    Violet_80: "#604EF3",
    Violet_70: "#594CDD",
    Violet_60: "#4843A8",
    Violet_50: "#3A3982",
    Violet_40: "#2E2E61",
    Violet_30: "#222342",
    Violet_20: "#17172B",
    Violet_10: "#080810",
  },

  // Purples
  purple: {
    Purple_160: "#FDF6FD",
    Purple_150: "#F6EAF9",
    Purple_140: "#EDDCF5",
    Purple_130: "#D8B9EC",
    Purple_120: "#C08FE0",
    Purple_110: "#B174D9",
    Purple_100: "#A660D4",
    Purple_90: "#9D4FCF",
    Purple_80: "#9049BE",
    Purple_70: "#8646AE",
    Purple_60: "#6A3D88",
    Purple_50: "#55346A",
    Purple_40: "#412B50",
    Purple_30: "#2F2139",
    Purple_20: "#1E1524",
    Purple_10: "#0B080D",
  },

  // Bright colors
  bright: {
    BlueBright: "#05A8FA",
    TealBright: "#1AC7BE",
    GreenBright: "#13BF86",
    YellowBright: "#E59408",
    OrangeBright: "#FF790D",
    MagentaBright: "#F558BB",
    PurpleBright: "#BC7EFF",
    VioletBright: "#8A80FF",
  },

  // Light tints
  lightTints: {
    LightTint_75: "#FFFFFFBF",
    LightTint_72: "#FFFFFFB8",
    LightTint_69: "#FFFFFFB1",
    LightTint_61: "#FFFFFF9B",
    LightTint_52: "#FFFFFF85",
    LightTint_44: "#FFFFFF6F",
    LightTint_35: "#FFFFFF59",
    LightTint_26: "#FFFFFF43",
    LightTint_17: "#FFFFFF2C",
    LightTint_13: "#FFFFFF21",
    LightTint_11: "#FFFFFF1B",
    LightTint_9: "#FFFFFF16",
    LightTint_7: "#FFFFFF12",
    LightTint_4: "#FFFFFF0B",
  },

  // Dark tints  
  darkTints: {
    DarkTint_63: "#000000A0",
    DarkTint_60: "#00000099",
    DarkTint_54: "#0000008B",
    DarkTint_45: "#00000073",
    DarkTint_27: "#00000046",
    DarkTint_18: "#0000002E",
    DarkTint_13: "#00000022",
    DarkTint_9: "#00000018",
    DarkTint_6: "#00000010",
    DarkTint_5: "#0000000C",
    DarkTint_3: "#00000007",
  },

  // Color tints
  colorTints: {
    BlueTint_60: "#0870E499",
    BlueTint_50: "#0870E480",
    BlueTint_40: "#0870E466",
    BlueTint_30: "#0870E44D",
    BlueTint_25: "#0870E440",
    BlueTint_20: "#0870E433",
    BlueTint_15: "#0870E426",
    GreenTint_30: "#14835E4D",
    RedTint_30: "#D732514D",
    YellowTint_30: "#9F680C4D",
    VioletTint_30: "#685AFB4D",
  },

  // Syntax highlighting
  syntax: {
    SyntaxKeyword: "#CF8E6D",
    SyntaxString: "#6AAB73", 
    SyntaxComment: "#7A7E85",
    SyntaxNumber: "#2AACB8",
    SyntaxFunction: "#56A8F5",
    SyntaxType: "#FFC66D",
    SyntaxVariable: "#E0E1E4",
    SyntaxError: "#FF6B68",
    SyntaxWarning: "#FFD23F",
    Transparent: "transparent",
  },
};

// Flatten all palette colors into a single lookup object
const allPaletteColors: Record<string, string> = {
  ...paletteColors.neutral,
  ...paletteColors.blue,
  ...paletteColors.green,
  ...paletteColors.red,
  ...paletteColors.yellow,
  ...paletteColors.violet,
  ...paletteColors.purple,
  ...paletteColors.bright,
  ...paletteColors.lightTints,
  ...paletteColors.darkTints,
  ...paletteColors.colorTints,
  ...paletteColors.syntax,
};

// Dark theme semantic color mappings (from Dark-Blue.json)
const darkThemeSemanticColors: Record<string, string> = {
  // Text colors
  "text.primary": "Neutral_140",
  "text.secondary": "LightTint_52", 
  "text.tertiary": "LightTint_35",
  "text.positive": "Green_110",
  "text.dangerous": "Red_110",
  "text.disabled": "LightTint_35",
  "text.bright": "White",
  "text.accent": "Blue_110",

  // Background colors
  "background.primary": "Neutral_10",
  "background.secondary": "Neutral_30",
  "background.frostedGlass.tint": "DarkTint_13",
  "background.frostedGlass.tint.accented": "BlueTint_20",

  // Border colors
  "border": "LightTint_13",
  "border.focused": "Blue_100",
  "focusOutline": "Blue_50",

  // Banner colors
  "banner.text": "Neutral_140",
  "banner.background.info": "Blue_30",
  "banner.background.dangerous": "Red_30",
  "banner.background.warning": "Yellow_30",
  "banner.background.positive": "Green_30",
  "banner.border.info": "Blue_60",
  "banner.border.dangerous": "Red_60",
  "banner.border.warning": "Yellow_60",
  "banner.border.positive": "Green_60",
  "banner.inline.background": "LightTint_9",

  // Button colors - Primary
  "button.primary.background.default": "Blue_90",
  "button.primary.background.hovered": "Blue_80",
  "button.primary.text.default": "White",
  "button.primary.border.default": "Blue_90",

  // Button colors - Secondary  
  "button.secondary.background.default": "LightTint_13",
  "button.secondary.background.hovered": "LightTint_11",
  "button.secondary.text.default": "Neutral_140",
  "button.secondary.border.default": "Transparent",

  // Button colors - Dangerous
  "button.dangerous.background.default": "Red_90",
  "button.dangerous.background.hovered": "Red_80",
  "button.dangerous.text.default": "White",
  "button.dangerous.border.default": "Red_90",

  // Button colors - Positive
  "button.positive.background.default": "Green_90",
  "button.positive.background.hovered": "Green_80",
  "button.positive.text.default": "White",
  "button.positive.border.default": "Green_90",

  // Button colors - Warning
  "button.warning.background.default": "Yellow_90",
  "button.warning.background.hovered": "Yellow_80",
  "button.warning.text.default": "White",
  "button.warning.border.default": "Yellow_90",

  // Chat colors
  "chat.message.user.background.default": "LightTint_11",
  "chat.message.user.background.hovered": "LightTint_13",
  "chat.message.ai.background.default": "Transparent",
  "chat.message.ai.background.hovered": "LightTint_4",
  "chat.widget.background.default": "LightTint_9",
  "chat.widget.background.accented": "Blue_30",
  "chat.widget.border.accented": "Blue_50",

  // Form elements
  "checkbox.off.background.default": "Transparent",
  "checkbox.on.background.default": "Blue_90",
  "checkbox.text.default": "Neutral_140",
  "inputField.background.default": "Transparent",
  "inputField.border.default": "LightTint_13",
  "inputField.text.default": "Neutral_140",
  "inputField.hint.default": "LightTint_35",
  "combobox.background.default": "Transparent",
  "combobox.border.default": "LightTint_13",
  "combobox.text.default": "Neutral_140",

  // List items
  "listItem.background.default": "Transparent",
  "listItem.background.hovered": "LightTint_4",
  "listItem.background.selected": "Blue_30",
  "listItem.background.focused": "LightTint_7",
  "listItem.text.default": "Neutral_140",
  "listItem.text.secondary": "LightTint_52",

  // Progress indicators
  "progressBar.determinate.background": "LightTint_13",
  "progressBar.determinate.foreground": "Blue_90",
  "progressBar.indeterminate.foreground": "Blue_90",
  "progressSpinner.foreground": "Blue_90",

  // Editor colors
  "editor.text": "Neutral_140",
  "editor.caret.background": "White",
  "editor.currentLine.background.default": "LightTint_4",
  "editor.currentLine.background.focused": "LightTint_7",
  "editor.lineNumber.default": "LightTint_35",
  "editor.lineNumber.current": "Neutral_140",
  "editor.whitespaceIndicator": "LightTint_17",

  // Terminal colors
  "terminal.background": "Neutral_10",
  "terminal.foreground": "Neutral_140",
  "terminal.foreground.ansiBlack": "Neutral_30",
  "terminal.foreground.ansiRed": "Red_110",
  "terminal.foreground.ansiGreen": "Green_110",
  "terminal.foreground.ansiYellow": "Yellow_110",
  "terminal.foreground.ansiBlue": "Blue_110",
  "terminal.foreground.ansiMagenta": "Purple_110",
  "terminal.foreground.ansiCyan": "TealBright",
  "terminal.foreground.ansiWhite": "Neutral_140",

  // Tags
  "tag.default.background": "LightTint_13",
  "tag.default.text": "Neutral_140",
  "tag.accent.background": "Blue_30",
  "tag.accent.text": "Blue_120",
  "tag.blue.background": "Blue_30",
  "tag.blue.text": "Blue_120",
  "tag.green.background": "Green_30",
  "tag.green.text": "Green_120",
  "tag.red.background": "Red_30",
  "tag.red.text": "Red_120",
  "tag.yellow.background": "Yellow_30",
  "tag.yellow.text": "Yellow_120",
  "tag.violet.background": "Violet_30",
  "tag.violet.text": "Violet_120",
  "tag.purple.background": "Purple_30",
  "tag.purple.text": "Purple_120",

  // AI-specific colors
  "ai.attachment.background.default": "LightTint_9",
  "ai.attachment.background.dangerous": "Red_30",
  "ai.chat.input.background.default": "LightTint_9",
  "ai.chat.input.border.default": "LightTint_13",
  "ai.chat.input.border.focused": "Blue_100",
  "ai.error.background": "Red_30",
  "ai.error.border": "Red_60",
  "ai.warning.background": "Yellow_30",
  "ai.warning.border": "Yellow_60",
  "ai.icon.background": "Violet_30",

  // Problem indicators
  "problemsWidget.tag.error.background.default": "Red_30",
  "problemsWidget.tag.error.text.default": "Red_120",
  "problemsWidget.tag.warning.background.default": "Yellow_30",
  "problemsWidget.tag.warning.text.default": "Yellow_120",
  "problemsWidget.tag.weakWarning.background.default": "LightTint_9",
  "problemsWidget.tag.weakWarning.text.default": "LightTint_52",
  "problemsWidget.tag.aiWarning.background.default": "Violet_30",
  "problemsWidget.tag.aiWarning.text.default": "Violet_120",
};

// Function to resolve semantic color to hex value
const resolveSemanticColor = (semanticColorName: string): string => {
  const paletteColorName = darkThemeSemanticColors[semanticColorName];
  if (!paletteColorName) {
    return "#FF00FF"; // Magenta for missing colors to make them obvious
  }
  
  const hexValue = allPaletteColors[paletteColorName];
  if (!hexValue) {
    return "#FF00FF"; // Magenta for missing palette colors
  }
  
  return hexValue;
};

// Organized semantic color categories
const semanticColorCategories = {
  // Text colors
  text: [
    "text.primary", "text.secondary", "text.tertiary", "text.positive",
    "text.dangerous", "text.disabled", "text.bright", "text.accent"
  ],

  // Background colors
  background: [
    "background.primary", "background.secondary", "background.frostedGlass.tint",
    "background.frostedGlass.tint.accented"
  ],

  // Border & focus
  border: [
    "border", "border.focused", "focusOutline"
  ],

  // Banner colors
  banner: [
    "banner.text", "banner.background.info", "banner.background.dangerous",
    "banner.background.warning", "banner.background.positive", "banner.border.info",
    "banner.border.dangerous", "banner.border.warning", "banner.border.positive",
    "banner.inline.background"
  ],

  // Button colors
  button: [
    "button.primary.background.default", "button.primary.background.hovered",
    "button.primary.text.default", "button.primary.border.default",
    "button.secondary.background.default", "button.secondary.background.hovered", 
    "button.secondary.text.default", "button.secondary.border.default",
    "button.dangerous.background.default", "button.dangerous.background.hovered",
    "button.dangerous.text.default", "button.dangerous.border.default",
    "button.positive.background.default", "button.positive.background.hovered",
    "button.positive.text.default", "button.positive.border.default",
    "button.warning.background.default", "button.warning.background.hovered",
    "button.warning.text.default", "button.warning.border.default"
  ],

  // Chat colors
  chat: [
    "chat.message.user.background.default", "chat.message.user.background.hovered",
    "chat.message.ai.background.default", "chat.message.ai.background.hovered",
    "chat.widget.background.default", "chat.widget.background.accented",
    "chat.widget.border.accented"
  ],

  // Form elements
  form: [
    "checkbox.off.background.default", "checkbox.on.background.default",
    "checkbox.text.default", "inputField.background.default",
    "inputField.border.default", "inputField.text.default",
    "inputField.hint.default", "combobox.background.default",
    "combobox.border.default", "combobox.text.default"
  ],

  // List items
  list: [
    "listItem.background.default", "listItem.background.hovered",
    "listItem.background.selected", "listItem.background.focused",
    "listItem.text.default", "listItem.text.secondary"
  ],

  // Progress and loading
  progress: [
    "progressBar.determinate.background", "progressBar.determinate.foreground",
    "progressBar.indeterminate.foreground", "progressSpinner.foreground"
  ],

  // Editor colors
  editor: [
    "editor.text", "editor.caret.background", "editor.currentLine.background.default",
    "editor.currentLine.background.focused", "editor.lineNumber.default",
    "editor.lineNumber.current", "editor.whitespaceIndicator"
  ],

  // Terminal colors
  terminal: [
    "terminal.background", "terminal.foreground", "terminal.foreground.ansiBlack",
    "terminal.foreground.ansiRed", "terminal.foreground.ansiGreen",
    "terminal.foreground.ansiYellow", "terminal.foreground.ansiBlue",
    "terminal.foreground.ansiMagenta", "terminal.foreground.ansiCyan",
    "terminal.foreground.ansiWhite"
  ],

  // Tags
  tag: [
    "tag.default.background", "tag.default.text", "tag.accent.background",
    "tag.accent.text", "tag.blue.background", "tag.blue.text",
    "tag.green.background", "tag.green.text", "tag.red.background",
    "tag.red.text", "tag.yellow.background", "tag.yellow.text",
    "tag.violet.background", "tag.violet.text", "tag.purple.background",
    "tag.purple.text"
  ],

  // AI-specific colors
  ai: [
    "ai.attachment.background.default", "ai.attachment.background.dangerous",
    "ai.chat.input.background.default", "ai.chat.input.border.default",
    "ai.chat.input.border.focused", "ai.error.background", "ai.error.border",
    "ai.warning.background", "ai.warning.border", "ai.icon.background"
  ],

  // Problem indicators
  problems: [
    "problemsWidget.tag.error.background.default", "problemsWidget.tag.error.text.default",
    "problemsWidget.tag.warning.background.default", "problemsWidget.tag.warning.text.default",
    "problemsWidget.tag.weakWarning.background.default", "problemsWidget.tag.weakWarning.text.default",
    "problemsWidget.tag.aiWarning.background.default", "problemsWidget.tag.aiWarning.text.default"
  ],
};

const ColorSwatch = ({ name, color, className = "" }: { 
  name: string; 
  color: string; 
  className?: string; 
}) => (
  <div className={`flex flex-col ${className}`}>
    <div 
      className="w-16 h-16 rounded-lg border border-border shadow-sm mb-2"
      style={{ backgroundColor: color }}
      title={`${name}: ${color}`}
    />
    <div className="text-xs">
      <div className="font-medium text-foreground truncate" title={name}>
        {name}
      </div>
      <div className="text-muted-foreground font-mono text-[10px]" title={color}>
        {color}
      </div>
    </div>
  </div>
);

const PaletteSection = ({ title, colors }: { 
  title: string; 
  colors: Record<string, string>; 
}) => (
  <div className="mb-8">
    <Typography variant="header-3-semibold" className="mb-4">{title}</Typography>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
      {Object.entries(colors).map(([name, color]) => (
        <ColorSwatch key={name} name={name} color={color} />
      ))}
    </div>
  </div>
);

const SemanticSection = ({ title, colorNames }: { 
  title: string; 
  colorNames: string[]; 
}) => (
  <div className="mb-8">
    <Typography variant="header-3-semibold" className="mb-4">{title}</Typography>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {colorNames.map((colorName) => {
        const resolvedColor = resolveSemanticColor(colorName);
        const paletteReference = darkThemeSemanticColors[colorName];
        
        return (
          <div key={colorName} className="flex items-center space-x-3 p-3 rounded-lg border border-border bg-card">
            <div 
              className="w-8 h-8 rounded border border-border flex-shrink-0"
              style={{ backgroundColor: resolvedColor }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-foreground truncate">
                {colorName}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {paletteReference} → {resolvedColor}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function ColorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <Typography variant="header-1-semibold" className="mb-2">Fleet Air Colors</Typography>
        <Typography variant="default" className="text-muted-foreground">
          Complete color system from JetBrains Fleet, including palette colors and semantic tokens
        </Typography>
      </div>

      {/* Palette Colors */}
      <div>
        <Typography variant="header-2-semibold" className="mb-6">Raw Palette Colors</Typography>
        <div className="space-y-8">
          <PaletteSection title="Neutral Colors" colors={paletteColors.neutral} />
          <PaletteSection title="Blue Colors (Accent)" colors={paletteColors.blue} />
          <PaletteSection title="Green Colors" colors={paletteColors.green} />
          <PaletteSection title="Red Colors" colors={paletteColors.red} />
          <PaletteSection title="Yellow Colors" colors={paletteColors.yellow} />
          <PaletteSection title="Violet Colors" colors={paletteColors.violet} />
          <PaletteSection title="Purple Colors" colors={paletteColors.purple} />
          <PaletteSection title="Bright Colors" colors={paletteColors.bright} />
          <PaletteSection title="Light Tints" colors={paletteColors.lightTints} />
          <PaletteSection title="Dark Tints" colors={paletteColors.darkTints} />
          <PaletteSection title="Color Tints" colors={paletteColors.colorTints} />
          <PaletteSection title="Syntax Highlighting" colors={paletteColors.syntax} />
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <Typography variant="header-2-semibold" className="mb-6">Semantic Color Tokens</Typography>
        <div className="space-y-8">
          <SemanticSection title="Text Colors" colorNames={semanticColorCategories.text} />
          <SemanticSection title="Background Colors" colorNames={semanticColorCategories.background} />
          <SemanticSection title="Border & Focus" colorNames={semanticColorCategories.border} />
          <SemanticSection title="Banner Colors" colorNames={semanticColorCategories.banner} />
          <SemanticSection title="Button Colors" colorNames={semanticColorCategories.button} />
          <SemanticSection title="Chat Colors" colorNames={semanticColorCategories.chat} />
          <SemanticSection title="Form Elements" colorNames={semanticColorCategories.form} />
          <SemanticSection title="List Items" colorNames={semanticColorCategories.list} />
          <SemanticSection title="Progress Indicators" colorNames={semanticColorCategories.progress} />
          <SemanticSection title="Editor Colors" colorNames={semanticColorCategories.editor} />
          <SemanticSection title="Terminal Colors" colorNames={semanticColorCategories.terminal} />
          <SemanticSection title="Tag Colors" colorNames={semanticColorCategories.tag} />
          <SemanticSection title="AI Colors" colorNames={semanticColorCategories.ai} />
          <SemanticSection title="Problem Indicators" colorNames={semanticColorCategories.problems} />
        </div>
      </div>
    </div>
  );
} 