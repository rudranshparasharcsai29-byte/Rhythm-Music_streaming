export const coverNames = ['cover-1', 'cover-2', 'cover-3', 'cover-4', 'cover-5', 'cover-6', 'cover-7', 'cover-8'] as const;

export type CoverName = (typeof coverNames)[number];

export function coverFromSeed(seed: string): CoverName {
  const value = Array.from(seed).reduce((total, char) => total + char.charCodeAt(0), 0);
  return coverNames[value % coverNames.length];
}
