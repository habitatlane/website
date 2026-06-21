/**
 * Habitat for Humanity of Central Lane — Design Tokens (machine-readable)
 * ----------------------------------------------------------------------
 * Mirrors `src/styles/tokens.css` for use in TypeScript/JS (e.g. inline
 * styles, dynamic theming, future component library, Storybook docs).
 *
 * Source of truth for runtime CSS is the .css file; this object exists so
 * the same values can be imported in code. Keep the two in sync. Destined
 * for the shared @habitat/ui package.
 */

/** OFFICIAL refreshed Habitat for Humanity palette. */
export const colors = {
  // Primary
  brightBlue: '#00AFD7',
  brightGreen: '#C4D600',
  // Neutrals
  coolGray: '#888B8D', // Cool Gray 8
  white: '#FFFFFF',
  black: '#000000',
  // Secondary
  habitatBlue: '#002F6C',
  habitatGreen: '#43B02A',
  orange: '#FF671F',
  brick: '#A4343A',
  // Tertiary (sparing use)
  yellow: '#FFD100',
} as const;

/** Semantic role -> palette mapping. Prefer these in components. */
export const roles = {
  brand: colors.habitatBlue,
  brandAccent: colors.brightBlue,
  action: colors.habitatGreen, // Donate / primary CTA
  actionSecondary: colors.brightBlue, // Volunteer / secondary CTA
  text: '#1A1D21',
  textMuted: colors.coolGray,
  bg: colors.white,
  bgInvert: colors.habitatBlue,
} as const;

export const fonts = {
  sans: "'Inter', system-ui, sans-serif",
  serif: "'Source Serif 4 Variable', Georgia, serif",
} as const;

export type ColorToken = keyof typeof colors;
export type RoleToken = keyof typeof roles;
