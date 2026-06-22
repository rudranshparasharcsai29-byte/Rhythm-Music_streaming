import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import type { MoodPlaylist } from '@/constants/mock-data';
import { CoverArt } from '@/components/cover-art';
import { shadows } from '@/constants/theme';

export function MoodCard({ item }: { item: MoodPlaylist }) {
  return (
    <Pressable className="mr-4 w-[220px]" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
      <LinearGradient colors={item.colors} className="overflow-hidden rounded-[28px] p-4" style={shadows.cardGlow}>
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-[18px] font-extrabold text-text">{item.title}</Text>
            <Text className="mt-1.5 text-[12px] leading-[17px] text-[#725A62]">{item.subtitle}</Text>
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/55">
            <Ionicons name="sparkles-outline" size={18} color="#2B1B1E" />
          </View>
        </View>

        <View className="mt-5 flex-row items-end justify-between">
          <View className="rounded-full bg-white/50 px-2.5 py-1">
            <Text className="text-[10px] font-extrabold uppercase tracking-[1.3px] text-[#7E5F68]">Mood playlist</Text>
          </View>
          <CoverArt cover={item.cover} size={78} rounded={18} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}
