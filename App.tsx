import './global.css';

import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MiniPlayer } from '@/components/mini-player';
import { PlayerSheet } from '@/components/player-sheet';
import { AppNavigation } from '@/navigation/app-navigation';
import { usePlaybackProgress } from '@/hooks/use-playback-progress';

export default function App() {
  usePlaybackProgress();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigation />
        <MiniPlayer />
        <PlayerSheet />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
