import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { LibraryItemModel } from '@/constants/mock-data';
import { CoverArt } from '@/components/cover-art';
import { GlassCard } from '@/components/glass-card';
import { colors } from '@/constants/theme';

type Props = {
  item: LibraryItemModel;
  grid?: boolean;
};

export function LibraryItem({ item, grid = false }: Props) {
  if (grid) {
    return (
      <Pressable className="w-[47.5%]" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
        <GlassCard className="rounded-[22px] p-3" intense>
          <CoverArt cover={item.cover} size="100%" rounded={16} artist={item.artist} />
          {item.tag ? (
            <View className="mt-3 self-start rounded-full bg-white/55 px-2.5 py-1">
              <Text className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#7B5D66]">{item.tag}</Text>
            </View>
          ) : null}
          <Text className="mt-2.5 text-[14px] font-extrabold text-text" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="mt-1 text-[12px] leading-[16px] text-muted" numberOfLines={2}>
            {item.subtitle}
          </Text>
        </GlassCard>
      </Pressable>
    );
  }

  return (
    <Pressable style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
      <GlassCard className="mb-3 flex-row items-center gap-3 rounded-[22px] px-3 py-3" intense>
        <CoverArt cover={item.cover} size={68} rounded={16} artist={item.artist} />
        <View className="flex-1">
          <Text className="text-[15px] font-extrabold text-text" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="mt-1 text-[12px] text-muted" numberOfLines={1}>
            {item.subtitle}
          </Text>
          {item.tag ? (
            <View className="mt-2 self-start rounded-full bg-white/52 px-2 py-1">
              <Text className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#7B5D66]">{item.tag}</Text>
            </View>
          ) : null}
        </View>
        <Ionicons name="ellipsis-horizontal" size={18} color={colors.muted} />
      </GlassCard>
    </Pressable>
  );
}
