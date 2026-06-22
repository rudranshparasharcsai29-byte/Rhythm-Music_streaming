import { useEffect } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';

import { CoverArt } from '@/components/cover-art';
import { GlassCard } from '@/components/glass-card';
import { Waveform } from '@/components/waveform';
import { colors, gradients, shadows } from '@/constants/theme';
import { usePlayerStore } from '@/store/player-store';
import { formatTime } from '@/utils/time';

const particles = [
  { id: '1', top: 90, left: 56, size: 8, delay: 0 },
  { id: '2', top: 128, right: 72, size: 10, delay: 300 },
  { id: '3', top: 320, left: 32, size: 6, delay: 650 },
  { id: '4', top: 410, right: 40, size: 9, delay: 240 },
  { id: '5', top: 620, left: 72, size: 7, delay: 520 },
  { id: '6', top: 700, right: 64, size: 8, delay: 110 },
];

export function PlayerSheet() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const {
    currentTrack,
    duration,
    isDownloaded,
    isFavorite,
    isPlaying,
    isPlayerExpanded,
    isShuffleEnabled,
    isBuffering,
    playbackError,
    progress,
    repeatMode,
    closePlayer,
    cycleRepeatMode,
    setProgress,
    requestSeek,
    toggleDownload,
    toggleFavorite,
    togglePlaying,
    toggleShuffle,
  } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack,
      duration: state.duration,
      isDownloaded: state.isDownloaded,
      isFavorite: state.isFavorite,
      isPlaying: state.isPlaying,
      isPlayerExpanded: state.isPlayerExpanded,
      isShuffleEnabled: state.isShuffleEnabled,
      isBuffering: state.isBuffering,
      playbackError: state.playbackError,
      progress: state.progress,
      repeatMode: state.repeatMode,
      closePlayer: state.closePlayer,
      cycleRepeatMode: state.cycleRepeatMode,
      setProgress: state.setProgress,
      requestSeek: state.requestSeek,
      toggleDownload: state.toggleDownload,
      toggleFavorite: state.toggleFavorite,
      togglePlaying: state.togglePlaying,
      toggleShuffle: state.toggleShuffle,
    })),
  );

  const translateY = useSharedValue(900);
  const rotate = useSharedValue(0);
  const halo = useSharedValue(0.98);
  const artScale = useSharedValue(0.98);
  const scrim = useSharedValue(0);

  useEffect(() => {
    if (isPlayerExpanded) {
      translateY.value = withSpring(0, { damping: 18, stiffness: 160 });
      scrim.value = withTiming(1, { duration: 260 });
      halo.value = withRepeat(
        withSequence(withTiming(1.04, { duration: 3200 }), withTiming(0.98, { duration: 3200 })),
        -1,
        true,
      );
      artScale.value = withRepeat(
        withSequence(withTiming(1.02, { duration: 2200 }), withTiming(0.98, { duration: 2200 })),
        -1,
        true,
      );
      return;
    }

    translateY.value = withTiming(900, { duration: 280 });
    scrim.value = withTiming(0, { duration: 220 });
    cancelAnimation(halo);
    cancelAnimation(artScale);
    halo.value = 0.98;
    artScale.value = 1;
  }, [artScale, halo, isPlayerExpanded, scrim, translateY]);

  useEffect(() => {
    if (isPlaying) {
      rotate.value = withRepeat(
        withTiming(rotate.value + 360, { duration: 7200, easing: Easing.linear }),
        -1,
        false,
      );
      return;
    }

    cancelAnimation(rotate);
    rotate.value = withTiming(rotate.value + 10, { duration: 240, easing: Easing.out(Easing.quad) });
  }, [isPlaying, rotate]);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 110) {
        runOnJS(closePlayer)();
      } else {
        translateY.value = withSpring(0, { damping: 18, stiffness: 170 });
      }
    });

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const vinylStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: halo.value }],
    opacity: 0.92,
  }));

  const artStyle = useAnimatedStyle(() => ({
    transform: [{ scale: artScale.value }],
  }));

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrim.value,
  }));

  const vinylSize = Math.min(width * 0.78, 328);
  const labelSize = vinylSize * 0.38;
  const grooveLarge = vinylSize * 0.68;
  const grooveMedium = vinylSize * 0.45;
  const grooveSmall = vinylSize * 0.29;

  return (
    <Modal visible={isPlayerExpanded} transparent animationType="none" onRequestClose={closePlayer}>
      <View style={styles.root}>
        <Animated.View style={[styles.scrim, scrimStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closePlayer} />
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.panel,
              panelStyle,
              { paddingTop: Math.max(12, insets.top), paddingBottom: Math.max(24, insets.bottom) },
            ]}>
            <BlurView intensity={55} tint="light" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
            <LinearGradient
              colors={['rgba(255,248,250,0.98)', 'rgba(255,238,243,0.99)', 'rgba(255,231,237,0.98)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.ambientOrbLeft} />
            <View style={styles.ambientOrbRight} />
            <View style={styles.ambientOrbBottom} />
            {particles.map((particle) => (
              <FloatingParticle key={particle.id} {...particle} />
            ))}

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.dragHandle} />

              <View style={styles.sheetBar}>
                <RoundIconButton icon="chevron-down" onPress={closePlayer} />
                <Text style={styles.sheetSource} numberOfLines={1}>
                  {currentTrack.source}
                </Text>
                <RoundIconButton icon="ellipsis-horizontal" />
              </View>

              <View style={[styles.vinylStage, { minHeight: vinylSize + 82 }]}>
                <Animated.View
                  style={[
                    styles.vinylHalo,
                    haloStyle,
                    { width: vinylSize + 36, height: vinylSize + 36, borderRadius: (vinylSize + 36) / 2 },
                  ]}
                />
                <Animated.View style={[styles.vinyl, shadows.float, vinylStyle, { width: vinylSize, height: vinylSize, borderRadius: vinylSize / 2 }]}>
                  <View style={[styles.vinylRing, { inset: vinylSize * 0.08, borderRadius: vinylSize }]} />
                  <View style={[styles.vinylReflectionA, { top: vinylSize * 0.15, left: vinylSize * 0.14, width: vinylSize * 0.28, height: vinylSize * 0.085 }]} />
                  <View style={[styles.vinylReflectionB, { right: vinylSize * 0.14, bottom: vinylSize * 0.2, width: vinylSize * 0.22, height: vinylSize * 0.075 }]} />
                  <View style={[styles.groove, { width: grooveLarge, height: grooveLarge, borderRadius: grooveLarge / 2 }]} />
                  <View style={[styles.groove, { width: grooveMedium, height: grooveMedium, borderRadius: grooveMedium / 2 }]} />
                  <View style={[styles.groove, { width: grooveSmall, height: grooveSmall, borderRadius: grooveSmall / 2 }]} />
                  <Animated.View style={[styles.recordLabel, artStyle, { width: labelSize, height: labelSize, borderRadius: labelSize / 2 }]}>
                    <CoverArt cover={currentTrack.cover} uri={currentTrack.artworkUri} size={labelSize - 14} rounded={999} />
                  </Animated.View>
                  <View style={styles.recordCore} />
                </Animated.View>
              </View>

              <GlassCard className="rounded-[28px] px-5 py-5" intense>
                <View className="flex-row items-start gap-3">
                  <View className="flex-1">
                    <Text numberOfLines={1} className="text-[26px] font-extrabold text-text">
                      {currentTrack.title}
                    </Text>
                    <Text className="mt-1 text-[15px] text-muted">{currentTrack.artist}</Text>
                    <Text className="mt-1 text-[12px] uppercase tracking-[1.3px] text-[#7A5963]">
                      {currentTrack.album}
                    </Text>
                  </View>
                  <RoundIconButton icon={isFavorite ? 'heart' : 'heart-outline'} onPress={toggleFavorite} active={isFavorite} />
                </View>

                <View className="mt-4 flex-row flex-wrap gap-2">
                  {currentTrack.tags.map((tag) => (
                    <View key={tag} className="rounded-full bg-white/55 px-3 py-1.5">
                      <Text className="text-[11px] font-extrabold text-[#7A5963]">{tag}</Text>
                    </View>
                  ))}
                </View>
              </GlassCard>

              <GlassCard className="mt-4 rounded-[28px] px-5 pb-4 pt-5" intense>
                <Slider
                  minimumValue={0}
                  maximumValue={duration || currentTrack.duration || 1}
                  value={progress}
                  minimumTrackTintColor={colors.accent}
                  maximumTrackTintColor="#FFD9E3"
                  thumbTintColor="#FFFFFF"
                  onValueChange={setProgress}
                  onSlidingComplete={requestSeek}
                />
                <View className="mt-1 flex-row justify-between">
                  <Text style={styles.timeText}>{formatTime(progress)}</Text>
                  <Text style={styles.timeText}>{formatTime(Math.max(0, (duration || currentTrack.duration) - progress))}</Text>
                </View>
              </GlassCard>

              {isBuffering || playbackError ? (
                <GlassCard className="mt-4 rounded-[24px] px-4 py-3">
                  <Text className="text-[12px] font-extrabold text-text">
                    {playbackError ? `Playback error: ${playbackError}` : 'Buffering audio stream...'}
                  </Text>
                </GlassCard>
              ) : null}

              <GlassCard className="mt-4 rounded-[28px] p-5" intense>
                <Text className="mb-3 text-[12px] font-extrabold uppercase tracking-[1.4px] text-[#7A5963]">
                  Live waveform
                </Text>
                <Waveform playing={isPlaying} />
              </GlassCard>

              <GlassCard className="mt-4 rounded-[30px] px-3 py-4" intense>
                <View className="flex-row items-center justify-between">
                  <ControlButton icon="shuffle" active={isShuffleEnabled} onPress={toggleShuffle} />
                  <ControlButton icon="play-skip-back" />
                  <Pressable onPress={togglePlaying} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.96 : 1 }] }]}>
                    <LinearGradient colors={gradients.accent} style={[styles.playButton, shadows.glow]}>
                      <Ionicons name={isPlaying ? 'pause' : 'play'} size={34} color="#fff" />
                    </LinearGradient>
                  </Pressable>
                  <ControlButton icon="play-skip-forward" />
                  <ControlButton
                    icon="repeat"
                    active={repeatMode !== 'off'}
                    badge={repeatMode === 'one' ? '1' : undefined}
                    onPress={cycleRepeatMode}
                  />
                </View>
              </GlassCard>

              <View className="mt-4 flex-row gap-3">
                <ActionTile icon={isFavorite ? 'heart' : 'heart-outline'} label="Favorite" active={isFavorite} onPress={toggleFavorite} />
                <ActionTile icon={isDownloaded ? 'download' : 'download-outline'} label="Download" active={isDownloaded} onPress={toggleDownload} />
                <ActionTile icon="list-outline" label="Queue" />
              </View>

              <View className="mt-3 flex-row gap-3">
                <ActionTile icon="tv-outline" label="Devices" />
                <ActionTile icon="share-social-outline" label="Share" />
                <ActionTile icon="albums-outline" label="Repeat" active={repeatMode !== 'off'} />
              </View>

              <GlassCard className="mt-5 rounded-[30px] px-5 py-5" intense>
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-[18px] font-extrabold text-text">Lyrics</Text>
                  <View className="rounded-full bg-white/55 px-3 py-1">
                    <Text className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#7A5963]">Synced</Text>
                  </View>
                </View>
                <Text style={styles.lyricLine}>{currentTrack.lyricLines[0]}</Text>
                <Text style={styles.currentLyric}>{currentTrack.lyricLines[1]}</Text>
                <Text style={styles.lyricLine}>{currentTrack.lyricLines[2]}</Text>
              </GlassCard>
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}

function FloatingParticle({
  top,
  left,
  right,
  size,
  delay,
}: {
  top: number;
  left?: number;
  right?: number;
  size: number;
  delay: number;
}) {
  const y = useSharedValue(0);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    y.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 2800 + delay, easing: Easing.inOut(Easing.ease) }),
        withTiming(4, { duration: 2800 + delay, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    opacity.value = withRepeat(
      withSequence(withTiming(0.85, { duration: 2200 + delay }), withTiming(0.32, { duration: 2200 + delay })),
      -1,
      true,
    );
  }, [delay, opacity, y]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        style,
        {
          top,
          left,
          right,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

function RoundIconButton({
  icon,
  onPress,
  active,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  active?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.roundIconButton, { transform: [{ scale: pressed ? 0.96 : 1 }] }]}>
      <Ionicons name={icon} size={20} color={active ? colors.accent : colors.text} />
    </Pressable>
  );
}

function ControlButton({
  icon,
  active,
  badge,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  badge?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.controlButton, { transform: [{ scale: pressed ? 0.96 : 1 }] }]}>
      <Ionicons name={icon} size={22} color={active ? colors.accent : colors.text} />
      {badge ? <Text style={styles.controlBadge}>{badge}</Text> : null}
      {active ? <View style={styles.controlDot} /> : null}
    </Pressable>
  );
}

function ActionTile({
  icon,
  label,
  active,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable className="flex-1" onPress={onPress} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      <GlassCard className="items-center rounded-[24px] px-3 py-4" intense>
        <View className="h-12 w-12 items-center justify-center rounded-full bg-white/55">
          <Ionicons name={icon} size={20} color={active ? colors.accent : colors.text} />
        </View>
        <Text className={`mt-3 text-[12px] font-extrabold ${active ? 'text-rose' : 'text-text'}`}>{label}</Text>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.scrim,
  },
  panel: {
    minHeight: '95%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  ambientOrbLeft: {
    position: 'absolute',
    top: 100,
    left: -30,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255,217,229,0.5)',
  },
  ambientOrbRight: {
    position: 'absolute',
    top: 160,
    right: -20,
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: 'rgba(228,216,255,0.4)',
  },
  ambientOrbBottom: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    width: 240,
    height: 240,
    borderRadius: 999,
    backgroundColor: 'rgba(255,205,219,0.36)',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(138,109,115,0.28)',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetSource: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(91,61,68,0.82)',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  roundIconButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.48)',
  },
  vinylStage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  vinylHalo: {
    position: 'absolute',
    backgroundColor: 'rgba(255,193,214,0.3)',
    shadowColor: colors.glow,
    shadowOpacity: 0.4,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 0 },
  },
  vinyl: {
    backgroundColor: '#140B0D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  vinylRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  vinylReflectionA: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.24)',
    transform: [{ rotate: '-26deg' }],
  },
  vinylReflectionB: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    transform: [{ rotate: '22deg' }],
  },
  groove: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  recordLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 7,
    borderColor: '#FFF7F9',
  },
  recordCore: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#F7CCD7',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  timeText: {
    color: colors.muted,
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
  playButton: {
    width: 82,
    height: 82,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  controlBadge: {
    position: 'absolute',
    right: 10,
    top: 9,
    color: colors.accent,
    fontSize: 10,
    fontWeight: '900',
  },
  lyricLine: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 30,
  },
  currentLyric: {
    color: colors.accent,
    fontSize: 17,
    lineHeight: 30,
    fontWeight: '900',
    marginVertical: 3,
  },
});
