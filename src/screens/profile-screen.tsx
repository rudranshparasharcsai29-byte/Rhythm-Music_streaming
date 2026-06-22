import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArtistPill } from '@/components/artist-pill';
import { GlassCard } from '@/components/glass-card';
import { SectionHeader } from '@/components/section-header';
import { favoriteArtists } from '@/constants/mock-data';
import { gradients, layout } from '@/constants/theme';

const actions = [
  { icon: 'moon-outline', label: 'Sleep timer', value: 'Off for now' },
  { icon: 'notifications-outline', label: 'Notifications', value: 'Soft alerts' },
  { icon: 'phone-portrait-outline', label: 'Streaming quality', value: 'Very high' },
  { icon: 'lock-closed-outline', label: 'Private session', value: 'Enabled' },
] as const;

export function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: layout.bottomTabsHeight + layout.miniPlayerHeight + 52 }}>
        <View className="px-5 pb-4 pt-2">
          <Text className="text-[28px] font-extrabold text-text">Profile</Text>
          <Text className="mt-1 text-[13px] text-muted">Your listening identity, premium plan, and device preferences.</Text>
        </View>

        <View className="px-5 pb-7">
          <LinearGradient colors={gradients.hero} className="overflow-hidden rounded-[32px] px-5 py-5">
            <View className="absolute -right-8 -top-4 h-36 w-36 rounded-full bg-white/35" />
            <View className="flex-row items-center gap-4">
              <View className="h-[78px] w-[78px] items-center justify-center rounded-full bg-rose">
                <Text className="text-[30px] font-extrabold text-white">R</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[24px] font-extrabold text-text">Rhythm Premium</Text>
                <Text className="mt-1 text-[14px] leading-[20px] text-muted">
                  Ad-free streaming, offline sync, and calm immersive playback.
                </Text>
              </View>
            </View>

            <View className="mt-5 flex-row gap-3">
              <GlassCard className="flex-1 rounded-[24px] px-4 py-4">
                <Text className="text-[11px] font-extrabold uppercase tracking-[1.3px] text-muted">Minutes today</Text>
                <Text className="mt-2 text-[24px] font-extrabold text-text">148</Text>
              </GlassCard>
              <GlassCard className="flex-1 rounded-[24px] px-4 py-4">
                <Text className="text-[11px] font-extrabold uppercase tracking-[1.3px] text-muted">Downloads</Text>
                <Text className="mt-2 text-[24px] font-extrabold text-text">18</Text>
              </GlassCard>
            </View>
          </LinearGradient>
        </View>

        <SectionHeader title="Favorite artists" subtitle="People you keep closest across moods and playlists" actionLabel="View all" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 18 }}>
          {favoriteArtists.map((item) => (
            <ArtistPill key={item.id} item={item} />
          ))}
        </ScrollView>

        <SectionHeader title="Playback settings" subtitle="Keep your mobile listening smooth, private, and high quality" />
        <View className="gap-3 px-5">
          {actions.map((item) => (
            <GlassCard key={item.label} className="rounded-[24px] px-4 py-4" intense>
              <Pressable className="flex-row items-center" style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
                <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-white/55">
                  <Ionicons name={item.icon} size={20} color="#2B1B1E" />
                </View>
                <View className="flex-1">
                  <Text className="text-[14px] font-extrabold text-text">{item.label}</Text>
                  <Text className="mt-1 text-[12px] text-muted">{item.value}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#8A6D73" />
              </Pressable>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
