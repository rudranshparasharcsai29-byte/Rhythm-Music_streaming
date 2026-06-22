import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import type { CategoryItem } from '@/constants/mock-data';
import { CoverArt } from '@/components/cover-art';
import { shadows } from '@/constants/theme';

export function CategoryTile({ item }: { item: CategoryItem }) {
  return (
    <Pressable className="w-[48.4%]" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
      <LinearGradient colors={item.colors} className="min-h-[128px] overflow-hidden rounded-[24px] p-4" style={shadows.cardGlow}>
        <View className="rounded-full self-start bg-white/50 px-2.5 py-1">
          <Text className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#785F66]">Browse</Text>
        </View>
        <Text className="mt-3 text-[18px] font-extrabold text-text">{item.title}</Text>
        <Text className="mt-1 text-[12px] text-[#725A62]">Mood-ready mixes</Text>
        <View className="absolute -bottom-4 -right-3 rotate-[15deg]">
          <CoverArt cover={item.cover} size={84} rounded={10} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}
