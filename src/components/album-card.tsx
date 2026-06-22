import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { AlbumItem } from '@/constants/mock-data';
import { CoverArt } from '@/components/cover-art';
import { GlassCard } from '@/components/glass-card';
import { colors, shadows } from '@/constants/theme';

export function AlbumCard({ item }: { item: AlbumItem }) {
  return (
    <Pressable className="mr-4 w-[158px]" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      <GlassCard className="rounded-[24px] p-2.5" intense>
        <CoverArt cover={item.cover} size={138} rounded={18} />
        {item.eyebrow ? (
          <Text className="mt-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-muted">
            {item.eyebrow}
          </Text>
        ) : null}
        <Text className="mt-1.5 text-[15px] font-extrabold text-text" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="mt-1 text-[12px] leading-[17px] text-muted" numberOfLines={2}>
          {item.subtitle}
        </Text>

        <View
          className="absolute right-3 top-[62px] h-[46px] w-[46px] items-center justify-center rounded-full bg-rose"
          style={shadows.glow}>
          <Ionicons name="play" size={16} color="#fff" />
        </View>

        <View
          className="absolute left-3 top-3 rounded-full px-2.5 py-1"
          style={{ backgroundColor: 'rgba(255,255,255,0.58)' }}>
          <Text className="text-[10px] font-extrabold uppercase tracking-[1.3px] text-[#7A5962]">Curated</Text>
        </View>
      </GlassCard>
    </Pressable>
  );
}
