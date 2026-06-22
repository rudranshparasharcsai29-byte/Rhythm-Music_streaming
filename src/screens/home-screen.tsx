import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlbumCard } from '@/components/album-card';
import { ArtistPill } from '@/components/artist-pill';
import { GlassCard } from '@/components/glass-card';
import { MoodCard } from '@/components/mood-card';
import { QuickCard } from '@/components/quick-card';
import { SectionHeader } from '@/components/section-header';
import {
  favoriteArtists,
  moodPlaylists,
  quickPicks,
  recommendedAlbums,
  trendingMusic,
} from '@/constants/mock-data';
import { colors, gradients, layout } from '@/constants/theme';
import { getGreeting } from '@/utils/time';

export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: layout.bottomTabsHeight + layout.miniPlayerHeight + 52 }}>
        <View className="px-5 pb-4 pt-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[13px] font-extrabold uppercase tracking-[1.6px] text-muted">
                Rhythm Daily
              </Text>
              <Text className="mt-1 text-[28px] font-extrabold text-text">{getGreeting()}</Text>
            </View>
            <View className="flex-row gap-2">
              <TopIcon icon="notifications-outline" />
              <TopIcon icon="time-outline" />
            </View>
          </View>
        </View>

        <View className="px-5 pb-7">
          <GlassCard className="rounded-[32px] p-0" intense>
            <LinearGradient colors={gradients.hero} className="overflow-hidden rounded-[32px] px-5 py-5">
              <View className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/35" />
              <View className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-[#ffd5e2]/70" />
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-[12px] font-extrabold uppercase tracking-[1.5px] text-[#7A5963]">
                    Curated just now
                  </Text>
                  <Text className="mt-2 text-[26px] font-extrabold leading-[32px] text-text">
                    Your calm-pop world, redesigned for tonight.
                  </Text>
                  <Text className="mt-2 text-[13px] leading-[19px] text-muted">
                    Gentle favorites, soft gradients, and premium playlists lined up for your next listen.
                  </Text>
                </View>
                <View className="rounded-full bg-white/60 px-3 py-1.5">
                  <Text className="text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#7A5963]">
                    Premium
                  </Text>
                </View>
              </View>

              <View className="mt-5 flex-row gap-3">
                <Pressable className="flex-1" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                  <View className="flex-row items-center justify-center rounded-full bg-[#ff6b8b] px-4 py-3">
                    <Ionicons name="play" size={18} color="#fff" />
                    <Text className="ml-2 text-[14px] font-extrabold text-white">Play Blend</Text>
                  </View>
                </Pressable>
                <Pressable className="flex-1" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                  <View className="flex-row items-center justify-center rounded-full bg-white/60 px-4 py-3">
                    <Ionicons name="sparkles-outline" size={18} color={colors.text} />
                    <Text className="ml-2 text-[14px] font-extrabold text-text">Refresh Mood</Text>
                  </View>
                </Pressable>
              </View>
            </LinearGradient>
          </GlassCard>
        </View>

        <SectionHeader
          title="Recently played"
          subtitle="Jump back into the sets you reached for most"
          actionLabel="See all"
        />
        <View className="flex-row flex-wrap justify-between gap-y-3 px-5 pb-8">
          {quickPicks.map((item) => (
            <QuickCard key={item.id} item={item} />
          ))}
        </View>

        <View className="pb-8">
          <SectionHeader
            title="Trending music"
            subtitle="Soft-pop and glossy edits rising around you"
            actionLabel="More"
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {trendingMusic.map((item) => (
              <AlbumCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        <View className="pb-8">
          <SectionHeader
            title="Mood playlists"
            subtitle="Designed for focus, floating, and slow resets"
            actionLabel="Browse"
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {moodPlaylists.map((item) => (
              <MoodCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        <View className="pb-8">
          <SectionHeader
            title="Favorite artists"
            subtitle="The voices shaping your current listening era"
            actionLabel="Followed"
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {favoriteArtists.map((item) => (
              <ArtistPill key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        <View className="pb-2">
          <SectionHeader
            title="Recommended albums"
            subtitle="Picked from your late-night glow and dreamy pop habits"
            actionLabel="Refresh"
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {recommendedAlbums.map((item) => (
              <AlbumCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopIcon({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <Pressable style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.96 : 1 }] }]}>
      <View className="h-[44px] w-[44px] items-center justify-center rounded-full bg-white/50">
        <Ionicons name={icon} size={20} color="#2B1B1E" />
      </View>
    </Pressable>
  );
}
