import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import { gradients, shadows } from '@/constants/theme';

type Props = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  intense?: boolean;
};

export function GlassCard({ children, className, style, intense = false }: Props) {
  return (
    <View className={className} style={[styles.container, intense ? shadows.float : shadows.soft, style]}>
      <BlurView intensity={intense ? 45 : 32} tint="light" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
      <LinearGradient colors={intense ? gradients.glassStrong : gradients.glass} style={StyleSheet.absoluteFill} />
      <View style={styles.glow} />
      <View style={styles.highlight} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  glow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  highlight: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
});
