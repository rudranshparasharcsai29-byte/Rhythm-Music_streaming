import type { CoverName } from '@/assets/cover-presets';

export type QuickPick = { id: string; title: string; cover: CoverName };
export type AlbumItem = {
  id: string;
  title: string;
  subtitle: string;
  cover: CoverName;
  eyebrow?: string;
};
export type MoodPlaylist = {
  id: string;
  title: string;
  subtitle: string;
  cover: CoverName;
  colors: [string, string];
};
export type ArtistItem = {
  id: string;
  name: string;
  monthlyListeners: string;
  cover: CoverName;
};
export type SearchTrend = {
  id: string;
  title: string;
  context: string;
};
export type CategoryItem = { id: string; title: string; cover: CoverName; colors: [string, string] };
export type DiscoveryPanel = {
  id: string;
  title: string;
  subtitle: string;
  colors: [string, string];
  cover: CoverName;
};
export type LibraryKind = 'all' | 'playlist' | 'artist' | 'album' | 'podcast';
export type LibraryShortcut = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colors: [string, string];
};
export type LibraryItemModel = {
  id: string;
  title: string;
  subtitle: string;
  cover: CoverName;
  kind: Exclude<LibraryKind, 'all'>;
  artist?: boolean;
  tag?: string;
};
export type Track = {
  id: string;
  title: string;
  artist: string;
  source: string;
  duration: number;
  durationLabel?: string;
  cover: CoverName;
  artworkUri?: string | null;
  streamUrl?: string;
  lyricLines: string[];
  album: string;
  tags: string[];
};

export const quickPicks: QuickPick[] = [
  { id: '1', title: 'Cherry Pop', cover: 'cover-1' },
  { id: '2', title: 'Soft Focus', cover: 'cover-2' },
  { id: '3', title: 'Morning Drive', cover: 'cover-3' },
  { id: '4', title: 'Pink Noise', cover: 'cover-4' },
  { id: '5', title: 'Fresh Indie', cover: 'cover-5' },
  { id: '6', title: 'Daily Bloom', cover: 'cover-6' },
];

export const trendingMusic: AlbumItem[] = [
  { id: '1', title: 'Rosewave Hits', subtitle: 'Bright hooks for your late commute', cover: 'cover-1', eyebrow: 'Trending' },
  { id: '2', title: 'Velvet Signal', subtitle: 'New synth-pop heat with soft basslines', cover: 'cover-8', eyebrow: 'For you' },
  { id: '3', title: 'Cloud Nine Radio', subtitle: 'Airy pop, dreamy remixes, warm shimmer', cover: 'cover-2', eyebrow: 'New drop' },
  { id: '4', title: 'Bloom Run', subtitle: 'Uplifting motion for high-energy mornings', cover: 'cover-4', eyebrow: 'Workout' },
];

export const moodPlaylists: MoodPlaylist[] = [
  { id: '1', title: 'Blush Focus', subtitle: 'Soft instrumentals for study hours', cover: 'cover-6', colors: ['#FFF4F8', '#E3D6FF'] },
  { id: '2', title: 'Golden Hour', subtitle: 'Pastel indie for sunset walks', cover: 'cover-3', colors: ['#FFF0E8', '#FFD1DC'] },
  { id: '3', title: 'Slow Spark', subtitle: 'Warm grooves with velvet synths', cover: 'cover-5', colors: ['#FFE7ED', '#CDEEDC'] },
  { id: '4', title: 'Afterglow', subtitle: 'Night listening with soft pulse', cover: 'cover-7', colors: ['#F8F2FF', '#FFD7E4'] },
];

export const favoriteArtists: ArtistItem[] = [
  { id: '1', name: 'Nova Rae', monthlyListeners: '8.2M monthly', cover: 'cover-1' },
  { id: '2', name: 'Mira Coast', monthlyListeners: '2.9M monthly', cover: 'cover-5' },
  { id: '3', name: 'Luma', monthlyListeners: '5.1M monthly', cover: 'cover-2' },
  { id: '4', name: 'The Velvet Keys', monthlyListeners: '1.3M monthly', cover: 'cover-7' },
];

export const recommendedAlbums: AlbumItem[] = [
  { id: '5', title: 'Daily Mix 01', subtitle: 'Picked from your soft-pop rotation', cover: 'cover-5', eyebrow: 'Recommended' },
  { id: '6', title: 'Focus Flow', subtitle: 'Polished instrumentals and clean piano', cover: 'cover-6', eyebrow: 'Focus' },
  { id: '7', title: 'Acoustic Blush', subtitle: 'Warm vocals, strings, and quiet textures', cover: 'cover-7', eyebrow: 'Mood' },
  { id: '8', title: 'New Finds', subtitle: 'Fresh releases selected for today', cover: 'cover-8', eyebrow: 'Fresh' },
];

export const trendingSearches: SearchTrend[] = [
  { id: '1', title: 'pink pilates playlist', context: 'rising now' },
  { id: '2', title: 'nova rae live', context: 'artist trend' },
  { id: '3', title: 'soft k-pop edits', context: 'viral sound' },
  { id: '4', title: 'dreamy study music', context: 'editor pick' },
];

export const discoveryPanels: DiscoveryPanel[] = [
  { id: '1', title: 'Fresh for your aura', subtitle: 'Pastel pop and clean hooks updated hourly', colors: ['#FFF1F6', '#FFD5E2'], cover: 'cover-1' },
  { id: '2', title: 'Moody midnight sets', subtitle: 'Gentle basslines and glossy night-drive energy', colors: ['#F4EEFF', '#E0D4FF'], cover: 'cover-8' },
  { id: '3', title: 'Gentle reset', subtitle: 'Breathy vocals and calming acoustic textures', colors: ['#FFF7EE', '#FFE2D5'], cover: 'cover-3' },
];

export const categories: CategoryItem[] = [
  { id: '1', title: 'Pop', cover: 'cover-1', colors: ['#FFD1DC', '#FFB6C1'] },
  { id: '2', title: 'Indie', cover: 'cover-5', colors: ['#FFC9D7', '#D7EBFF'] },
  { id: '3', title: 'Workouts', cover: 'cover-4', colors: ['#FFE3E8', '#FFC0A8'] },
  { id: '4', title: 'Podcasts', cover: 'cover-6', colors: ['#FFD1DC', '#D8C7FF'] },
  { id: '5', title: 'Charts', cover: 'cover-7', colors: ['#FFC6D2', '#FFF0A8'] },
  { id: '6', title: 'Mood', cover: 'cover-2', colors: ['#FFE3E8', '#BDE7D2'] },
  { id: '7', title: 'R&B', cover: 'cover-8', colors: ['#FFD1DC', '#CBB6FF'] },
  { id: '8', title: 'Fresh', cover: 'cover-3', colors: ['#FFC8D8', '#B8ECFF'] },
];

export const libraryShortcuts: LibraryShortcut[] = [
  { id: '1', title: 'Liked Songs', subtitle: '248 saved tracks', icon: 'heart', colors: ['#FFDCE6', '#FFC1D2'] },
  { id: '2', title: 'Downloads', subtitle: '18 available offline', icon: 'download-outline', colors: ['#FFF0EA', '#FFD4D1'] },
  { id: '3', title: 'Offline Bloom', subtitle: 'Autoplay for flights and low signal', icon: 'cloud-offline-outline', colors: ['#F8F1FF', '#E5D8FF'] },
  { id: '4', title: 'Recently Played', subtitle: 'Keep your flow in motion', icon: 'time-outline', colors: ['#FFF7EF', '#FFE2D7'] },
];

export const libraryItems: LibraryItemModel[] = [
  { id: '1', title: 'Cherry Pop', subtitle: 'Playlist - 48 tracks', cover: 'cover-1', kind: 'playlist', tag: 'Pinned' },
  { id: '2', title: 'Soft Focus Sessions', subtitle: 'Album - Luma', cover: 'cover-2', kind: 'album', tag: 'Downloaded' },
  { id: '3', title: 'Nova Rae', subtitle: 'Artist', cover: 'cover-3', kind: 'artist', artist: true, tag: 'Favorite' },
  { id: '4', title: 'Culture Notes', subtitle: 'Podcast - 92 episodes', cover: 'cover-6', kind: 'podcast' },
  { id: '5', title: 'Workout Spark', subtitle: 'Playlist - 66 tracks', cover: 'cover-4', kind: 'playlist', tag: 'New mix' },
  { id: '6', title: 'Mira Coast', subtitle: 'Artist', cover: 'cover-5', kind: 'artist', artist: true },
  { id: '7', title: 'Retro Heart', subtitle: 'Album - The Velvet Keys', cover: 'cover-7', kind: 'album' },
  { id: '8', title: 'After Hours', subtitle: 'Playlist - 38 tracks', cover: 'cover-8', kind: 'playlist', tag: 'For tonight' },
];

export const currentTrack: Track = {
  id: 'sweet-static',
  title: 'Sweet Static',
  artist: 'Nova Rae',
  source: 'Playing from Daily Bloom',
  duration: 192,
  durationLabel: '3:12',
  cover: 'cover-1',
  artworkUri: null,
  album: 'Midnight Cherry Extended Mix',
  streamUrl: undefined,
  tags: ['Lossless', 'Dolby Atmos', 'Soft pop'],
  lyricLines: [
    'Pastel lights on the dashboard',
    'Heartbeat syncs with the stereo',
    'We keep spinning through the city glow',
  ],
};
