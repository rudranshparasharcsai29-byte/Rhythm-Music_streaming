import { Platform } from 'react-native';

import { coverFromSeed } from '@/assets/cover-presets';
import type { Track } from '@/constants/mock-data';
import {
  categories,
  currentTrack,
  discoveryPanels,
  favoriteArtists,
  libraryItems,
  libraryShortcuts,
  moodPlaylists,
  quickPicks,
  recommendedAlbums,
  trendingMusic,
} from '@/constants/mock-data';

export type HomeFeedResponse = {
  recent: typeof quickPicks;
  trending: typeof trendingMusic;
  moods: typeof moodPlaylists;
  artists: typeof favoriteArtists;
  recommended: typeof recommendedAlbums;
};

export type SearchResponse = {
  categories: typeof categories;
  discovery: typeof discoveryPanels;
};

export type LibraryResponse = {
  shortcuts: typeof libraryShortcuts;
  items: typeof libraryItems;
};

export type SearchTrack = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  durationLabel: string;
  cover: ReturnType<typeof coverFromSeed>;
  artworkUri?: string | null;
};

type BackendSearchResponse = {
  success: boolean;
  results?: Array<{
    id: string;
    title: string;
    artist: string;
    duration: string;
    thumbnail: string | null;
  }>;
  message?: string;
};

type BackendStreamResponse = {
  success: boolean;
  title?: string;
  thumbnail?: string | null;
  streamUrl?: string;
  message?: string;
};

function getApiBaseUrl() {
  const configured = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  return 'http://localhost:3000';
}

function parseDurationToSeconds(value: string) {
  const parts = value.split(':').map((part) => Number.parseInt(part, 10));
  if (parts.some(Number.isNaN)) {
    return 0;
  }

  return parts.reduce((total, part) => total * 60 + part, 0);
}

async function fetchJson<T>(path: string) {
  const response = await fetch(`${getApiBaseUrl()}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export interface MusicService {
  getHomeFeed(): Promise<HomeFeedResponse>;
  search(query: string): Promise<SearchResponse>;
  searchTracks(query: string): Promise<SearchTrack[]>;
  getLibrary(): Promise<LibraryResponse>;
  getCurrentTrack(): Promise<typeof currentTrack>;
  getStreamUrl(trackId: string): Promise<string>;
  prepareTrack(track: SearchTrack): Promise<Track>;
}

class ApiBackedMusicService implements MusicService {
  async getHomeFeed(): Promise<HomeFeedResponse> {
    return {
      recent: quickPicks,
      trending: trendingMusic,
      moods: moodPlaylists,
      artists: favoriteArtists,
      recommended: recommendedAlbums,
    };
  }

  async search(query: string): Promise<SearchResponse> {
    const normalized = query.trim().toLowerCase();

    return {
      categories: normalized
        ? categories.filter((item) => item.title.toLowerCase().includes(normalized))
        : categories,
      discovery: discoveryPanels,
    };
  }

  async searchTracks(query: string): Promise<SearchTrack[]> {
    const normalized = query.trim();
    if (!normalized) {
      return [];
    }

    const payload = await fetchJson<BackendSearchResponse>(
      `/search?q=${encodeURIComponent(normalized)}`,
    );

    if (!payload.success || !payload.results) {
      throw new Error(payload.message || 'Search failed');
    }

    return payload.results.map((item) => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      duration: parseDurationToSeconds(item.duration),
      durationLabel: item.duration,
      cover: coverFromSeed(item.id),
      artworkUri: item.thumbnail,
    }));
  }

  async getLibrary(): Promise<LibraryResponse> {
    return {
      shortcuts: libraryShortcuts,
      items: libraryItems,
    };
  }

  async getCurrentTrack(): Promise<typeof currentTrack> {
    return currentTrack;
  }

  async getStreamUrl(trackId: string): Promise<string> {
    const payload = await fetchJson<BackendStreamResponse>(`/stream/${encodeURIComponent(trackId)}`);

    if (!payload.success || !payload.streamUrl) {
      throw new Error(payload.message || 'Stream URL unavailable');
    }

    return payload.streamUrl;
  }

  async prepareTrack(track: SearchTrack): Promise<Track> {
    const payload = await fetchJson<BackendStreamResponse>(`/stream/${encodeURIComponent(track.id)}`);

    if (!payload.success || !payload.streamUrl) {
      throw new Error(payload.message || 'Failed to load stream');
    }

    return {
      id: track.id,
      title: payload.title || track.title,
      artist: track.artist,
      source: `Playing from search results`,
      duration: track.duration,
      durationLabel: track.durationLabel,
      cover: track.cover,
      artworkUri: payload.thumbnail ?? track.artworkUri ?? null,
      streamUrl: payload.streamUrl,
      album: 'Streaming from backend',
      tags: ['Backend stream', 'YouTube source', 'Live search'],
      lyricLines: currentTrack.lyricLines,
    };
  }
}

export const musicService: MusicService = new ApiBackedMusicService();
