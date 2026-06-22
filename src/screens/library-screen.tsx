import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlbumCard } from '@/components/album-card';
import { GlassCard } from '@/components/glass-card';
import { LibraryItem } from '@/components/library-item';
import { SectionHeader } from '@/components/section-header';
import { ShortcutTile } from '@/components/shortcut-tile';
import {
  libraryItems,
  libraryShortcuts,
  recommendedAlbums,
} from '@/constants/mock-data';
import { colors, layout } from '@/constants/theme';
import { usePlayerStore } from '@/store/player-store';

const filters = [
  { key: 'all', label: 'Saved' },
  { key: 'artist', label: 'Artists' },
  { key: 'album', label: 'Albums' },
  { key: 'podcast', label: 'Podcasts' },
] as const;

export function LibraryScreen() {
  const libraryFilter = usePlayerStore((state) => state.libraryFilter);
  const setLibraryFilter = usePlayerStore((state) => state.setLibraryFilter);
  const libraryView = usePlayerStore((state) => state.libraryView);
  const toggleLibraryView = usePlayerStore((state) => state.toggleLibraryView);

  const visibleItems = libraryItems.filter((item) =>
    libraryFilter === 'all' ? item.kind === 'playlist' || item.kind === 'album' : item.kind === libraryFilter,
  );

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: layout.bottomTabsHeight + layout.miniPlayerHeight + 52 }}>
        <View className="px-5 pb-4 pt-2">
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-rose">
              <Text className="text-[17px] font-extrabold text-white">R</Text>
            </View>
            <View className="flex-1">
              <Text className="text-[28px] font-extrabold text-text">Your Library</Text>
              <Text className="mt-1 text-[12px] text-muted">Saved worlds, offline sets, and playlists you keep close</Text>
            </View>
            <Pressable onPress={toggleLibraryView} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.96 : 1 }] }]}>
              <View className="h-[44px] w-[44px] items-center justify-center rounded-full bg-white/55">
                <Ionicons name={libraryView === 'grid' ? 'list' : 'grid'} size={20} color="#2B1B1E" />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-3 px-5 pb-8">
          {libraryShortcuts.map((item) => (
            <View key={item.id} className="w-[48%]">
              <ShortcutTile item={item} />
            </View>
          ))}
        </View>

        <SectionHeader title="Continue listening" subtitle="Resume where your current vibe left off" actionLabel="Open queue" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}>
          {recommendedAlbums.map((item) => (
            <AlbumCard key={item.id} item={item} />
          ))}
        </ScrollView>

        <View className="px-5 pb-4 pt-3">
          <GlassCard className="rounded-[28px] px-4 py-4" intense>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {filters.map((filter) => {
                const active = libraryFilter === filter.key;
                return (
                  <Pressable
                    key={filter.key}
                    onPress={() => setLibraryFilter(filter.key)}
                    style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                    <View className={`rounded-full px-4 py-2.5 ${active ? 'bg-rose' : 'bg-white/60'}`}>
                      <Text className={`text-[13px] font-extrabold ${active ? 'text-white' : 'text-text'}`}>{filter.label}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View className="mt-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="list-outline" size={17} color={colors.text} />
                <Text className="ml-2 text-[12px] font-extrabold text-text">Sorted by recent</Text>
              </View>
              <Text className="text-[12px] font-semibold text-muted">
                {visibleItems.length} saved {visibleItems.length === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </GlassCard>
        </View>

        <SectionHeader title="Saved collections" subtitle="Your playlists, albums, artists, and podcasts in one calm space" />
        <View className={`px-5 ${libraryView === 'grid' ? 'flex-row flex-wrap justify-between gap-y-3' : ''}`}>
          {visibleItems.map((item) => (
            <LibraryItem key={item.id} item={item} grid={libraryView === 'grid'} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
