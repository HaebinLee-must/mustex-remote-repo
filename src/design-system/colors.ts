/**
 * Design System - Color Tokens
 * Mongolia Blue Sky Theme (CEX Global)
 *
 * Primary: #593FFF (Brand Action Color)
 * Success: #00C087 (Emerald Green)
 * Danger: #FF4D4F (Cinnabar Red)
 * Dark BG: #000000 (Main), #1E2329 (Surface)
 * Light BG: #FFFFFF (Main), #F5F5F5 (Surface)
 */

// Hex color values for reference
export const colorPalette = {
  // Brand - Mongolia Blue Sky
  // mongolianBlue: '#9E6AFF', // Removed as it's no longer the primary

  // Status colors (Trading)
  emeraldGreen: '#00C087',  // Success / Price Up
  cinnabarRed: '#FF4D4F',   // Danger / Price Down

  // Dark mode backgrounds
  darkMain: '#000000',
  darkSurface: '#1E2329',
  darkBorder: '#2F343C',
  darkMuted: '#848E9C',
  darkText: '#EAECEF',

  // Light mode backgrounds
  lightMain: '#FFFFFF',
  lightSurface: '#F5F5F5',
} as const;

// CSS Variable definitions for dark theme (Default for CEX)
export const darkThemeVariables = {
  // Base radius
  '--radius': '0.5rem',

  // Core colors - Dark Mode
  '--background': '#000000',              // Deep dark main
  '--foreground': '#EAECEF',              // Light text

  // Card surfaces
  '--card': '#1E2329',                    // Surface/Cards
  '--card-foreground': '#EAECEF',

  // Popover surfaces
  '--popover': '#1E2329',
  '--popover-foreground': '#EAECEF',

  // Primary - Mongolian Blue
  '--primary': '#593FFF',                 // Brand Action Color
  '--primary-foreground': '#FFFFFF',      // White text on blue

  // Secondary
  '--secondary': '#474D57',
  '--secondary-foreground': '#EAECEF',

  // Muted
  '--muted': '#1E2329',
  '--muted-foreground': '#848E9C',

  // Accent
  '--accent': '#1E2329',
  '--accent-foreground': '#EAECEF',

  // Destructive - Cinnabar Red
  '--destructive': '#FF4D4F',
  '--destructive-foreground': '#FFFFFF',

  // Success - Emerald Green
  '--success': '#00C087',
  '--success-foreground': '#FFFFFF',

  // Warning
  '--warning': '#F0B90B',
  '--warning-foreground': '#000000',

  // Border and Input
  '--border': '#2F343C',
  '--input': '#2F343C',
  '--ring': '#593FFF',                    // Brand Action Color for focus

  // Chart colors
  '--chart-1': '#00C087',                 // Green (Success)
  '--chart-2': '#FF4D4F',                 // Red (Danger)
  '--chart-3': '#593FFF',                 // Blue (Primary - Brand Action)
  '--chart-4': '#F0B90B',                 // Yellow (Warning)
  '--chart-5': '#A855F7',                 // Purple
} as const;

// Light theme variables
export const lightThemeVariables = {
  '--radius': '0.5rem',

  // Core colors - Light Mode
  '--background': '#FFFFFF',
  '--foreground': '#000000',

  // Card surfaces
  '--card': '#F5F5F5',
  '--card-foreground': '#000000',

  // Popover surfaces
  '--popover': '#FFFFFF',
  '--popover-foreground': '#000000',

  // Primary - Mongolian Blue
  '--primary': '#593FFF',
  '--primary-foreground': '#FFFFFF',

  // Secondary
  '--secondary': '#E5E7EB',
  '--secondary-foreground': '#000000',

  // Muted
  '--muted': '#F5F5F5',
  '--muted-foreground': '#6B7280',

  // Accent
  '--accent': '#E0F2FE',                  // Light blue
  '--accent-foreground': '#593FFF',

  // Destructive - Cinnabar Red
  '--destructive': '#FF4D4F',
  '--destructive-foreground': '#FFFFFF',

  // Success - Emerald Green
  '--success': '#00C087',
  '--success-foreground': '#FFFFFF',

  // Warning
  '--warning': '#F0B90B',
  '--warning-foreground': '#000000',

  // Border and Input
  '--border': '#E5E7EB',
  '--input': '#E5E7EB',
  '--ring': '#593FFF',

  // Chart colors
  '--chart-1': '#00C087',
  '--chart-2': '#FF4D4F',
  '--chart-3': '#593FFF',
  '--chart-4': '#F0B90B',
  '--chart-5': '#A855F7',
} as const;

// Semantic color mapping for use in components
export const semanticColors = {
  // Brand
  brand: {
    primary: 'var(--primary)',
    primaryForeground: 'var(--primary-foreground)',
  },

  // Status colors
  status: {
    success: 'var(--success)',
    successForeground: 'var(--success-foreground)',
    destructive: 'var(--destructive)',
    destructiveForeground: 'var(--destructive-foreground)',
    warning: 'var(--warning)',
    warningForeground: 'var(--warning-foreground)',
  },

  // UI surfaces
  surface: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    card: 'var(--card)',
    cardForeground: 'var(--card-foreground)',
    popover: 'var(--popover)',
    popoverForeground: 'var(--popover-foreground)',
    muted: 'var(--muted)',
    mutedForeground: 'var(--muted-foreground)',
  },

  // Interactive
  interactive: {
    accent: 'var(--accent)',
    accentForeground: 'var(--accent-foreground)',
    border: 'var(--border)',
    input: 'var(--input)',
    ring: 'var(--ring)',
  },
} as const;

export type ThemeVariables = typeof darkThemeVariables;
