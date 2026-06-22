import { create } from 'zustand';

import { currentTrack, type LibraryKind, type Track } from '@/constants/mock-data';

type LibraryView = 'list' | 'grid';
type RepeatMode = 'off' | 'all' | 'one';

type PlayerState = {
  currentTrack: Track;
  isPlaying: boolean;
  isFavorite: boolean;
  isDownloaded: boolean;
  isPlayerExpanded: boolean;
  isShuffleEnabled: boolean;
  isBuffering: boolean;
  playbackError: string | null;
  repeatMode: RepeatMode;
  progress: number;
  duration: number;
  pendingSeekSeconds: number | null;
  libraryFilter: LibraryKind;
  libraryView: LibraryView;
  searchTerm: string;
  activeSearchQuery: string;
  recentSearches: string[];
  setSearchTerm: (value: string) => void;
  commitSearch: (value?: string) => void;
  clearRecentSearches: () => void;
  togglePlaying: () => void;
  toggleFavorite: () => void;
  toggleDownload: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  openPlayer: () => void;
  closePlayer: () => void;
  setProgress: (value: number) => void;
  requestSeek: (value: number) => void;
  clearPendingSeek: () => void;
  setLibraryFilter: (value: LibraryKind) => void;
  toggleLibraryView: () => void;
  setCurrentTrack: (track: Track) => void;
  setPlaybackState: (
    value: Partial<Pick<PlayerState, 'isPlaying' | 'isBuffering' | 'progress' | 'duration' | 'playbackError'>>,
  ) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack,
  isPlaying: false,
  isFavorite: true,
  isDownloaded: false,
  isPlayerExpanded: false,
  isShuffleEnabled: true,
  isBuffering: false,
  playbackError: null,
  repeatMode: 'all',
  progress: 0,
  duration: currentTrack.duration,
  pendingSeekSeconds: null,
  libraryFilter: 'all',
  libraryView: 'list',
  searchTerm: '',
  activeSearchQuery: '',
  recentSearches: ['dream pop', 'late night drive', 'nova rae', 'focus flow'],
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  commitSearch: (value) =>
    set((state) => {
      const term = (value ?? state.searchTerm).trim();
      if (!term) {
        return {};
      }

      return {
        searchTerm: term,
        activeSearchQuery: term,
        recentSearches: [
          term,
          ...state.recentSearches.filter((item) => item.toLowerCase() !== term.toLowerCase()),
        ].slice(0, 6),
      };
    }),
  clearRecentSearches: () => set({ recentSearches: [] }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  toggleFavorite: () => set((state) => ({ isFavorite: !state.isFavorite })),
  toggleDownload: () => set((state) => ({ isDownloaded: !state.isDownloaded })),
  toggleShuffle: () => set((state) => ({ isShuffleEnabled: !state.isShuffleEnabled })),
  cycleRepeatMode: () =>
    set((state) => ({
      repeatMode: state.repeatMode === 'off' ? 'all' : state.repeatMode === 'all' ? 'one' : 'off',
    })),
  openPlayer: () => set({ isPlayerExpanded: true }),
  closePlayer: () => set({ isPlayerExpanded: false }),
  setProgress: (progress) => {
    const duration = get().duration;
    set({ progress: Math.max(0, Math.min(progress, duration || progress)) });
  },
  requestSeek: (value) => {
    const duration = get().duration;
    const next = Math.max(0, Math.min(value, duration || value));
    set({ progress: next, pendingSeekSeconds: next });
  },
  clearPendingSeek: () => set({ pendingSeekSeconds: null }),
  setLibraryFilter: (libraryFilter) => set({ libraryFilter }),
  toggleLibraryView: () =>
    set((state) => ({ libraryView: state.libraryView === 'list' ? 'grid' : 'list' })),
  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
      duration: track.duration,
      progress: 0,
      isPlaying: true,
      isBuffering: true,
      playbackError: null,
      pendingSeekSeconds: null,
      isDownloaded: false,
    }),
  setPlaybackState: (value) => set(value),
}));
