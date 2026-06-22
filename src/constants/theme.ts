export const colors = {
  accent: '#FF6B8B',
  accentSoft: '#FF95AA',
  accentGlow: 'rgba(255, 107, 139, 0.24)',
  rose: '#F7B1C2',
  blush: '#FFF5F7',
  blushStrong: '#FFF8FA',
  cream: '#FFFDF9',
  peach: '#FFD9C8',
  lavender: '#E4D8FF',
  surface: '#FFE7ED',
  surfaceStrong: '#FFD6E1',
  surfaceMuted: '#FFEFF4',
  text: '#2B1B1E',
  muted: '#8A6D73',
  mutedStrong: '#6F5760',
  divider: '#F5C2CC',
  white: '#FFFFFF',
  shadow: 'rgba(86, 38, 50, 0.18)',
  shadowSoft: 'rgba(112, 59, 71, 0.12)',
  glow: 'rgba(255, 178, 198, 0.55)',
  tabGlow: 'rgba(255, 107, 139, 0.22)',
  scrim: 'rgba(73, 44, 51, 0.24)',
};

export const layout = {
  screenPadding: 20,
  bottomTabsHeight: 92,
  miniPlayerHeight: 72,
  maxContentWidth: 520,
};

export const radii = {
  sm: 16,
  md: 22,
  lg: 28,
  pill: 999,
};

export const gradients = {
  appBackground: ['#FFF8FA', '#FFF4F7', '#FFF9FB'] as const,
  screenGlow: ['rgba(255,255,255,0.76)', 'rgba(255,236,242,0.18)'] as const,
  shellOverlay: ['rgba(255,255,255,0.72)', 'rgba(255,245,247,0.94)'] as const,
  glass: ['rgba(255,255,255,0.52)', 'rgba(255,232,238,0.88)'] as const,
  glassStrong: ['rgba(255,255,255,0.64)', 'rgba(255,227,232,0.94)'] as const,
  accent: ['#FF7E9C', '#FF6388'] as const,
  hero: ['#FFF9FB', '#FFE6EF', '#FFD9E6'] as const,
  halo: ['rgba(255,193,214,0.48)', 'rgba(255,193,214,0.08)'] as const,
  peachy: ['#FFE9E0', '#FFD1DC'] as const,
  lavender: ['#F5EEFF', '#E4D8FF'] as const,
  cream: ['#FFFDF9', '#FFECEE'] as const,
};

export const shadows = {
  soft: {
    shadowColor: '#703B47',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  float: {
    shadowColor: '#5A2A37',
    shadowOpacity: 0.18,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
  },
  glow: {
    shadowColor: '#FF6B8B',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  cardGlow: {
    shadowColor: '#FFB9CB',
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
};
