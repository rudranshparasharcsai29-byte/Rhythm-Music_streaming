import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryTile } from '@/components/category-tile';
import { CoverArt } from '@/components/cover-art';
import { SectionHeader } from '@/components/section-header';
import { categories, discoveryPanels, trendingSearches } from '@/constants/mock-data';
import { colors, layout, shadows } from '@/constants/theme';
import { musicService, type SearchTrack } from '@/services/music-service';
import { usePlayerStore } from '@/store/player-store';

export function SearchScreen() {
  const activeSearchQuery = usePlayerStore((state) => state.activeSearchQuery);
  const searchTerm = usePlayerStore((state) => state.searchTerm);
  const recentSearches = usePlayerStore((state) => state.recentSearches);
  const setSearchTerm = usePlayerStore((state) => state.setSearchTerm);
  const commitSearch = usePlayerStore((state) => state.commitSearch);
  const clearRecentSearches = usePlayerStore((state) => state.clearRecentSearches);
  const setCurrentTrack = usePlayerStore((state) => state.setCurrentTrack);
  const openPlayer = usePlayerStore((state) => state.openPlayer);

  const [results, setResults] = useState<SearchTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingTrackId, setLoadingTrackId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeSearchQuery) {
      setResults([]);
      setError(null);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const next = await musicService.searchTracks(activeSearchQuery);

        if (!cancelled) {
          setResults(next);
        }
      } catch (nextError) {
        if (!cancelled) {
          setError(nextError instanceof Error ? nextError.message : 'Search failed');
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [activeSearchQuery]);

  const normalized = searchTerm.trim().toLowerCase();
  const filteredCategories = normalized
    ? categories.filter((item) => item.title.toLowerCase().includes(normalized))
    : categories;
  const filteredTrends = normalized
    ? trendingSearches.filter((item) => item.title.toLowerCase().includes(normalized))
    : trendingSearches;

  async function handlePlayTrack(track: SearchTrack) {
    try {
      setLoadingTrackId(track.id);
      const prepared = await musicService.prepareTrack(track);
      setCurrentTrack(prepared);
      openPlayer();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to start playback');
    } finally {
      setLoadingTrackId(null);
    }
  }

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: layout.bottomTabsHeight + layout.miniPlayerHeight + 52 }}>
        <View className="px-5 pb-4 pt-2">
          <Text className="text-[28px] font-extrabold text-text">Search</Text>
          <Text className="mt-1 text-[13px] leading-[19px] text-muted">
            Find songs, moods, genres, and aesthetic playlists built for your vibe.
          </Text>

          <View className="mt-5 flex-row items-center rounded-[30px] bg-white/65 px-4 py-4" style={shadows.soft}>
            <Ionicons name="search" size={20} color={colors.muted} />
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              onSubmitEditing={() => commitSearch()}
              placeholder="What do you want to listen to?"
              placeholderTextColor="#8A6D73"
              returnKeyType="search"
              className="ml-3 flex-1 text-[16px] font-semibold text-text"
            />
            {searchTerm ? (
              <Pressable onPress={() => setSearchTerm('')}>
                <Ionicons name="close-circle" size={20} color={colors.muted} />
              </Pressable>
            ) : null}
          </View>
        </View>

        {activeSearchQuery ? (
          <>
            <SectionHeader
              title="Search results"
              subtitle={loading ? `Searching for "${activeSearchQuery}"` : `Results for "${activeSearchQuery}"`}
            />
            <View className="px-5 pb-7">
              <View className="rounded-[28px] bg-white/50 p-4" style={shadows.soft}>
                {loading ? (
                  <View className="flex-row items-center justify-center py-6">
                    <ActivityIndicator color={colors.accent} />
                    <Text className="ml-3 text-[13px] font-extrabold text-text">Finding tracks...</Text>
                  </View>
                ) : null}

                {!loading && error ? (
                  <Text className="text-[13px] font-extrabold text-[#9A4E63]">{error}</Text>
                ) : null}

                {!loading && !error && !results.length ? (
                  <Text className="text-[13px] font-extrabold text-text">No tracks found for this search.</Text>
                ) : null}

                {!loading && !error
                  ? results.map((item) => {
                      const pending = loadingTrackId === item.id;

                      return (
                        <Pressable
                          key={item.id}
                          onPress={() => handlePlayTrack(item)}
                          className="mb-3 flex-row items-center rounded-[22px] bg-white/58 px-3 py-3 last:mb-0"
                          style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
                          <CoverArt cover={item.cover} uri={item.artworkUri} size={58} rounded={16} />
                          <View className="ml-3 flex-1">
                            <Text className="text-[14px] font-extrabold text-text" numberOfLines={1}>
                              {item.title}
                            </Text>
                            <Text className="mt-1 text-[12px] text-muted" numberOfLines={1}>
                              {item.artist}
                            </Text>
                          </View>
                          <View className="items-end">
                            <Text className="mb-2 text-[11px] font-semibold text-muted">{item.durationLabel}</Text>
                            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#ffd7e3]">
                              {pending ? (
                                <ActivityIndicator size="small" color={colors.accent} />
                              ) : (
                                <Ionicons name="play" size={16} color={colors.text} />
                              )}
                            </View>
                          </View>
                        </Pressable>
                      );
                    })
                  : null}
              </View>
            </View>
          </>
        ) : null}

        <SectionHeader title="Trending searches" subtitle="Live phrases people are reaching for right now" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}>
          {filteredTrends.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => commitSearch(item.title)}
              className="mr-3"
              style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
              <View className="rounded-full bg-white/60 px-4 py-3" style={shadows.soft}>
                <Text className="text-[13px] font-extrabold text-text">{item.title}</Text>
                <Text className="mt-1 text-[11px] text-muted">{item.context}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <SectionHeader title="Discovery" subtitle="Curated worlds that change the mood instantly" actionLabel="Explore" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}>
          {discoveryPanels.map((panel) => (
            <Pressable
              key={panel.id}
              className="mr-4 w-[248px]"
              style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
              <LinearGradient colors={panel.colors} className="overflow-hidden rounded-[28px] p-4" style={shadows.cardGlow}>
                <View className="rounded-full self-start bg-white/55 px-2.5 py-1">
                  <Text className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#7A5B63]">Discover</Text>
                </View>
                <Text className="mt-3 text-[20px] font-extrabold leading-[24px] text-text">{panel.title}</Text>
                <Text className="mt-2 text-[12px] leading-[18px] text-[#735A62]">{panel.subtitle}</Text>
                <View className="mt-6 flex-row items-center">
                  <Ionicons name="sparkles-outline" size={16} color="#2B1B1E" />
                  <Text className="ml-2 text-[12px] font-extrabold text-text">Open collection</Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>

        {recentSearches.length ? (
          <>
            <SectionHeader title="Recent searches" subtitle="Quick access to your latest moods and artists" actionLabel="Clear" />
            <View className="px-5 pb-7">
              <View className="rounded-[28px] bg-white/50 p-4" style={shadows.soft}>
                <View className="mb-2 flex-row justify-end">
                  <Pressable onPress={clearRecentSearches}>
                    <Text className="text-[12px] font-extrabold text-[#7A5963]">Clear all</Text>
                  </Pressable>
                </View>
                {recentSearches.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => commitSearch(item)}
                    className="mb-2 flex-row items-center rounded-[20px] bg-white/55 px-4 py-3 last:mb-0"
                    style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-[#ffe0e8]">
                      <Ionicons name="time-outline" size={18} color={colors.text} />
                    </View>
                    <Text className="ml-3 flex-1 text-[14px] font-extrabold text-text">{item}</Text>
                    <Ionicons name="arrow-up-outline" size={16} color={colors.muted} />
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        ) : null}

        <SectionHeader title="Genres to explore" subtitle="Colorful entry points built for thumb-first browsing" actionLabel="View all" />
        <View className="flex-row flex-wrap justify-between gap-y-3 px-5">
          {filteredCategories.map((item) => (
            <CategoryTile key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
