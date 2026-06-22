import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useShallow } from 'zustand/react/shallow';

import { CoverArt } from '@/components/cover-art';
import { colors, gradients, layout, shadows } from '@/constants/theme';
import { usePlayerStore } from '@/store/player-store';

export function MiniPlayer() {
  const insets = useSafeAreaInsets();
  const {
    currentTrack,
    duration,
    isDownloaded,
    isFavorite,
    isPlaying,
    progress,
    toggleDownload,
    toggleFavorite,
    togglePlaying,
    openPlayer,
    isPlayerExpanded,
  } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack,
      duration: state.duration,
      isDownloaded: state.isDownloaded,
      isFavorite: state.isFavorite,
      isPlaying: state.isPlaying,
      progress: state.progress,
      toggleDownload: state.toggleDownload,
      toggleFavorite: state.toggleFavorite,
      togglePlaying: state.togglePlaying,
      openPlayer: state.openPlayer,
      isPlayerExpanded: state.isPlayerExpanded,
    })),
  );
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: isPlayerExpanded ? 0 : 1,
  }));

  if (isPlayerExpanded) {
    return null;
  }

  const progressWidth = `${duration > 0 ? (progress / duration) * 100 : 0}%` as const;

  return (
    <Animated.View
      style={[
        styles.container,
        shadows.float,
        animatedStyle,
        { bottom: insets.bottom + layout.bottomTabsHeight + 10 },
      ]}>
      <BlurView intensity={42} tint="light" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
      <LinearGradient colors={gradients.glassStrong} style={StyleSheet.absoluteFill} />
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <Pressable
        onPress={openPlayer}
        onPressIn={() => {
          scale.value = withSpring(0.985);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        style={styles.mainButton}>
        <CoverArt cover={currentTrack.cover} uri={currentTrack.artworkUri} size={44} rounded={14} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>
            {currentTrack.title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {currentTrack.artist} - {currentTrack.album}
          </Text>
        </View>
      </Pressable>
      <IconButton icon={isDownloaded ? 'download' : 'download-outline'} onPress={toggleDownload} active={isDownloaded} />
      <IconButton icon={isPlaying ? 'pause' : 'play'} onPress={togglePlaying} />
      <IconButton icon={isFavorite ? 'heart' : 'heart-outline'} onPress={toggleFavorite} active={isFavorite} />
    </Animated.View>
  );
}

function IconButton({
  icon,
  onPress,
  active,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  active?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <Ionicons name={icon} size={18} color={active ? colors.accent : colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    zIndex: 30,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: layout.miniPlayerHeight,
    borderRadius: 26,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.52)',
  },
  progressTrack: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 0,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  mainButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 6,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  artist: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
});
