import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import type { LibraryShortcut } from '@/constants/mock-data';
import { shadows } from '@/constants/theme';

export function ShortcutTile({ item }: { item: LibraryShortcut }) {
  return (
    <LinearGradient colors={item.colors} className="min-h-[124px] flex-1 rounded-[24px] p-4" style={shadows.cardGlow}>
      <View className="h-11 w-11 items-center justify-center rounded-full bg-white/55">
        <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#2B1B1E" />
      </View>
      <Text className="mt-5 text-[16px] font-extrabold text-text">{item.title}</Text>
      <Text className="mt-1 text-[12px] leading-[17px] text-[#725A62]">{item.subtitle}</Text>
    </LinearGradient>
  );
}
