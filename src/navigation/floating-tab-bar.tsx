import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { colors, gradients, layout, shadows } from '@/constants/theme';

const routeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Search: 'search',
  Library: 'library',
  Profile: 'person',
};

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(12, insets.bottom), height: layout.bottomTabsHeight + insets.bottom }]}>
      <BlurView intensity={45} tint="light" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
      <LinearGradient colors={gradients.glassStrong} style={StyleSheet.absoluteFill} />
      <View style={styles.innerGlow} />
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;

          return (
            <Pressable key={route.key} onPress={() => navigation.navigate(route.name as never)} style={styles.tabButton}>
              <AnimatedTab focused={focused} icon={routeIcons[route.name]} label={String(label)} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function AnimatedTab({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.05 : 1) }],
  }));

  const bubbleStyle = useAnimatedStyle(() => ({
    opacity: withSpring(focused ? 1 : 0.6),
  }));

  return (
    <View style={styles.tabInner}>
      <Animated.View style={[styles.activeBubble, bubbleStyle]} />
      <Animated.View style={iconStyle}>
        <View style={[styles.iconBubble, focused && styles.iconBubbleActive]}>
          <Ionicons name={icon} size={22} color={focused ? colors.accent : colors.mutedStrong} />
        </View>
      </Animated.View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.58)',
    ...shadows.float,
  },
  innerGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
  },
  tabInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  activeBubble: {
    position: 'absolute',
    top: 6,
    width: 68,
    height: 42,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  iconBubble: {
    width: 62,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleActive: {
    backgroundColor: 'rgba(255,255,255,0.86)',
    shadowColor: colors.accent,
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  tabLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: colors.text,
    fontWeight: '900',
  },
});
