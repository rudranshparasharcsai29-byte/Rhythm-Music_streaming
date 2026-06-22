import { Pressable, Text, View } from 'react-native';

import type { ArtistItem } from '@/constants/mock-data';
import { CoverArt } from '@/components/cover-art';
import { GlassCard } from '@/components/glass-card';

export function ArtistPill({ item }: { item: ArtistItem }) {
  return (
    <Pressable className="mr-3 w-[116px]" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      <GlassCard className="items-center rounded-[26px] px-3 py-4" intense>
        <CoverArt cover={item.cover} size={72} rounded={999} artist />
        <Text className="mt-3 text-center text-[14px] font-extrabold text-text" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="mt-1 text-center text-[11px] leading-[15px] text-muted" numberOfLines={2}>
          {item.monthlyListeners}
        </Text>
      </GlassCard>
    </Pressable>
  );
}
