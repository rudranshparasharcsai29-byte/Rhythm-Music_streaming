import { useEffect } from 'react';
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';

import { usePlayerStore } from '@/store/player-store';

const EMPTY_AUDIO =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export function usePlaybackProgress() {
  const player = useAudioPlayer(
    {
      uri: EMPTY_AUDIO,
    },
    {
      updateInterval: 1000,
    }
  );

  const status = useAudioPlayerStatus(player);

  const currentTrack = usePlayerStore(
    (state) => state.currentTrack
  );

  const isPlaying = usePlayerStore(
    (state) => state.isPlaying
  );

  const pendingSeekSeconds = usePlayerStore(
    (state) => state.pendingSeekSeconds
  );

  const repeatMode = usePlayerStore(
    (state) => state.repeatMode
  );

  const clearPendingSeek = usePlayerStore(
    (state) => state.clearPendingSeek
  );

  const setPlaybackState = usePlayerStore(
    (state) => state.setPlaybackState
  );

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    });
  }, []);

  useEffect(() => {
    player.loop = repeatMode === 'one';
  }, [player, repeatMode]);

  useEffect(() => {
    const streamUrl = currentTrack.streamUrl;

    if (!streamUrl) {
      player.pause();
      player.clearLockScreenControls();
      return;
    }

    setPlaybackState({
      isBuffering: true,
      playbackError: null,
      progress: 0,
      duration: currentTrack.duration,
    });

    player.replace({
      uri: streamUrl,
    });
  }, [
    currentTrack.duration,
    currentTrack.id,
    currentTrack.streamUrl,
    player,
    setPlaybackState,
  ]);

  useEffect(() => {
    if (!currentTrack.streamUrl || !status.isLoaded) {
      return;
    }

    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [
    currentTrack.streamUrl,
    isPlaying,
    player,
    status.isLoaded,
  ]);

  useEffect(() => {
    if (
      !currentTrack.streamUrl ||
      pendingSeekSeconds == null ||
      !status.isLoaded
    ) {
      return;
    }

    void player.seekTo(pendingSeekSeconds).finally(() => {
      clearPendingSeek();
    });
  }, [
    clearPendingSeek,
    currentTrack.streamUrl,
    pendingSeekSeconds,
    player,
    status.isLoaded,
  ]);

  useEffect(() => {
    if (!currentTrack.streamUrl) {
      return;
    }

    setPlaybackState({
      isPlaying: status.playing,
      isBuffering: status.isBuffering,
      progress: status.currentTime,
      duration: status.duration || currentTrack.duration,
      playbackError: status.error,
    });
  }, [
    currentTrack.duration,
    currentTrack.streamUrl,
    setPlaybackState,
    status.currentTime,
    status.duration,
    status.error,
    status.isBuffering,
    status.playing,
  ]);
}