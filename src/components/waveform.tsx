import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const waveBarIndexes = Array.from({ length: 18 }, (_, index) => index);

function WaveBar({ index, playing }: { index: number; playing: boolean }) {
  const scale = useSharedValue(0.42 + (index % 3) * 0.1);

  useEffect(() => {
    if (playing) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 420 + (index % 4) * 120, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.32 + (index % 5) * 0.08, { duration: 460 + (index % 3) * 110, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );
      return;
    }

    cancelAnimation(scale);
    scale.value = withTiming(0.3, { duration: 220 });
  }, [index, playing, scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scaleY: scale.value }],
    opacity: playing ? 1 : 0.62,
  }));

  return (
    <Animated.View
      style={[
        {
          width: 8,
          borderRadius: 999,
          overflow: 'hidden',
          shadowColor: '#FF6B8B',
          shadowOpacity: 0.18,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
        },
        style,
      ]}>
      <LinearGradient colors={['rgba(255,156,182,0.98)', 'rgba(255,107,139,0.82)']} style={{ height: 52 }} />
    </Animated.View>
  );
}

export function Waveform({ playing }: { playing: boolean }) {
  return (
    <View className="h-[52px] flex-row items-end justify-between">
      {waveBarIndexes.map((index) => (
        <WaveBar key={index} index={index} playing={playing} />
      ))}
    </View>
  );
}
