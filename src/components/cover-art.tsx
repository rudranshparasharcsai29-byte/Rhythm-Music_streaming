import { StyleSheet, View, type DimensionValue, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import type { CoverName } from '@/assets/cover-presets';

type Props = {
  cover: CoverName;
  uri?: string | null;
  size?: number | string;
  rounded?: number;
  artist?: boolean;
};

const coverStyles: Record<
  CoverName,
  {
    colors: readonly [string, string, ...string[]];
    mode: 'spot' | 'bars' | 'diagonal' | 'dots' | 'glow' | 'stripes' | 'conic' | 'sheen';
  }
> = {
  'cover-1': { colors: ['#FF6B8B', '#FFD1DC', '#FF94AF'], mode: 'stripes' },
  'cover-2': { colors: ['#FFC8D8', '#B9DFFF'], mode: 'spot' },
  'cover-3': { colors: ['#FFD1DC', '#F7E6A2'], mode: 'diagonal' },
  'cover-4': { colors: ['#FF6B8B', '#FFBD9D'], mode: 'dots' },
  'cover-5': { colors: ['#F9B4C3', '#BDE7D2'], mode: 'glow' },
  'cover-6': { colors: ['#FFE3E8', '#D7C4FF'], mode: 'bars' },
  'cover-7': { colors: ['#FF6B8B', '#FFD1DC', '#8A6D73'], mode: 'conic' },
  'cover-8': { colors: ['#FFC2D1', '#D6EDFF', '#FFF0B8'], mode: 'sheen' },
};

export function CoverArt({ cover, uri, size = 64, rounded = 16, artist = false }: Props) {
  const preset = coverStyles[cover];
  const dimensionStyle: ViewStyle =
    typeof size === 'number'
      ? { width: size, height: size }
      : { width: size as DimensionValue, aspectRatio: 1 };

  return (
    <View style={[dimensionStyle, { borderRadius: artist ? 999 : rounded, overflow: 'hidden' }]}>
      <LinearGradient colors={preset.colors} style={StyleSheet.absoluteFill} />
      {uri ? (
        <Image source={uri} style={StyleSheet.absoluteFill} contentFit="cover" transition={180} />
      ) : null}
      {preset.mode === 'spot' && <View style={styles.spot} />}
      {preset.mode === 'bars' && (
        <View style={styles.row}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </View>
      )}
      {preset.mode === 'diagonal' && <View style={styles.diagonal} />}
      {preset.mode === 'dots' && (
        <>
          <View style={[styles.dot, { top: 10, right: 16 }]} />
          <View style={[styles.dot, { top: 28, right: 6 }]} />
          <View style={[styles.dot, { top: 42, right: 22 }]} />
        </>
      )}
      {preset.mode === 'glow' && <View style={styles.glow} />}
      {preset.mode === 'stripes' && (
        <>
          <View style={[styles.stripe, { left: 10 }]} />
          <View style={[styles.stripe, { left: 26 }]} />
          <View style={[styles.stripe, { left: 42 }]} />
        </>
      )}
      {preset.mode === 'conic' && (
        <>
          <View style={[styles.ring, { width: '72%', height: '72%', top: '14%', left: '14%' }]} />
          <View style={[styles.ring, { width: '32%', height: '32%', top: '34%', left: '34%' }]} />
        </>
      )}
      {preset.mode === 'sheen' && <View style={styles.sheen} />}
      {uri ? <View style={styles.imageOverlay} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  spot: {
    position: 'absolute',
    top: '16%',
    left: '16%',
    width: '30%',
    height: '30%',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  row: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    opacity: 0.28,
  },
  bar: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  diagonal: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: '70%',
    height: '70%',
    backgroundColor: 'rgba(43,27,30,0.18)',
    transform: [{ rotate: '28deg' }],
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  glow: {
    position: 'absolute',
    right: '10%',
    bottom: '10%',
    width: '34%',
    height: '34%',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.36)',
  },
  stripe: {
    position: 'absolute',
    top: -10,
    width: 8,
    height: '140%',
    backgroundColor: 'rgba(255,255,255,0.32)',
    transform: [{ rotate: '45deg' }],
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,245,247,0.9)',
  },
  sheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(43,27,30,0.1)',
  },
});
