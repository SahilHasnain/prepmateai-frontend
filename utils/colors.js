/**
 * Design System Color Palette
 * Extracted from project design tokens
 *
 * Primary Colors (p1-p5): Cyan/Blue accent colors
 * Secondary Colors (s1-s5): Dark blue background colors
 * Black variants: Pure black and dark blue-black
 */

export const colors = {
  // Primary Colors - Accents & Highlights
  p1: "#2EF2FF", // Bright cyan - primary accent
  p2: "#3C52D9", // Vivid blue - secondary accent
  p3: "#C8EA80", // Lime green - success/highlight
  p4: "#EAEDFF", // Very light blue - text/backgrounds
  p5: "#C4CBF5", // Light blue - secondary text

  // Secondary Colors - Backgrounds & Surfaces
  s1: "#080D27", // Deepest dark blue - primary background
  s2: "#0C1838", // Dark blue - secondary background
  s3: "#334679", // Medium blue - tertiary background
  s4: "#1959AD", // Bright blue - accent background
  s5: "#263466", // Dark medium blue - surface

  // Black Variants
  black: "#000000",
  black100: "#05091D", // Dark blue-black
};

/**
 * Gradient Definitions
 * Linear gradients for backgrounds, cards, and effects
 */
export const gradients = {
  g1: ["rgba(196, 203, 245, 0.5)", "transparent"],
  g2: ["#3062a3", "#19549f"],
  g3: ["#3c52d9", "#0c1838"],
  g4: ["#253575", "#162561"],
  g5: ["#334679", "#162561"],
  g6: ["#334679", "#0c1838"],
  g7: ["#1b275a", "#0e1434"],
  g8: ["transparent", "#2ef2ff", "transparent"], // horizontal glow
  g9: ["#080d27", "transparent"],
};

/**
 * Shadow Presets
 * Box shadow values for depth and elevation
 */
export const shadows = {
  // Layered shadow with blue inset glow
  shadow100: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  // Enhanced shadow with brighter blue inset
  shadow200: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  // Medium shadow with blue inset
  shadow300: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  // Subtle inner highlight
  shadow400: {
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  // Deep shadow with glow
  shadow500: {
    shadowColor: "#28336f",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.7,
    shadowRadius: 24,
    elevation: 16,
  },
};

/**
 * Typography Scale
 * Font sizes and weights matching design system
 */
export const typography = {
  hNum: { fontSize: 72, fontWeight: "bold", lineHeight: 84 },
  h1: { fontSize: 84, fontWeight: "900", lineHeight: 84 },
  h2: { fontSize: 64, fontWeight: "900", lineHeight: 64 },
  h3: { fontSize: 48, fontWeight: "600", lineHeight: 56 },
  h4: { fontSize: 40, fontWeight: "600", lineHeight: 52 },
  h5: { fontSize: 32, fontWeight: "600", lineHeight: 40 },
  h6: { fontSize: 24, fontWeight: "500", lineHeight: 36 },
  body1: { fontSize: 22, lineHeight: 36 },
  body2: { fontSize: 18, fontWeight: "600", lineHeight: 32 },
  body3: { fontSize: 16, lineHeight: 28 },
  base: { fontSize: 16, fontWeight: "500", lineHeight: 24 },
  baseBold: { fontSize: 16, fontWeight: "bold", lineHeight: 24 },
  baseSmall: { fontSize: 14, fontWeight: "600", lineHeight: 18 },
  small1: { fontSize: 14, fontWeight: "600", lineHeight: 18 },
  small2: { fontSize: 12, fontWeight: "bold", lineHeight: 16 },
  smallCompact: { fontSize: 12, fontWeight: "600", lineHeight: 18 },
};

/**
 * Spacing Scale
 * Custom spacing values for consistent layout
 */
export const spacing = {
  22: 88,
  100: 100,
  330: 330,
  388: 388,
  400: 400,
  440: 440,
  512: 512,
  640: 640,
  960: 960,
  1230: 1230,
};
