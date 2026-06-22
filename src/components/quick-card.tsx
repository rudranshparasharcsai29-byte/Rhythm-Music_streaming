import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { QuickPick } from '@/constants/mock-data';
import { CoverArt } from '@/components/cover-art';
import { GlassCard } from '@/components/glass-card';

export function QuickCard({ item }: { item: QuickPick }) {
  return (
    <Pressable className="w-[48.5%]" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
      <GlassCard className="min-h-[72px] flex-row items-center rounded-[22px] px-2.5 py-2" intense>
        <CoverArt cover={item.cover} size={56} rounded={18} />
        <View className="ml-3 flex-1">
          <Text className="text-[13px] font-extrabold leading-[17px] text-text">{item.title}</Text>
          <Text className="mt-1 text-[11px] text-muted">Recently played</Text>
        </View>
        <View className="h-8 w-8 items-center justify-center rounded-full bg-white/55">
          <Ionicons name="play" size={14} color="#2B1B1E" />
        </View>
      </GlassCard>
    </Pressable>
  );
}
