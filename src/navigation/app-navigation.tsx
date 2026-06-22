import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { colors, gradients } from '@/constants/theme';
import { FloatingTabBar } from '@/navigation/floating-tab-bar';
import { HomeScreen } from '@/screens/home-screen';
import { LibraryScreen } from '@/screens/library-screen';
import { ProfileScreen } from '@/screens/profile-screen';
import { SearchScreen } from '@/screens/search-screen';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.blush,
    card: 'transparent',
    text: colors.text,
    border: 'transparent',
    primary: colors.accent,
  },
};

export function AppNavigation() {
  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.appBackground} style={StyleSheet.absoluteFill} />
      <View style={styles.orbTopLeft} />
      <View style={styles.orbTopRight} />
      <View style={styles.orbMiddle} />
      <View style={styles.orbBottom} />

      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
          tabBar={(props) => <FloatingTabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Library" component={LibraryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blush,
  },
  orbTopLeft: {
    position: 'absolute',
    top: 20,
    left: -30,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(255,209,220,0.46)',
  },
  orbTopRight: {
    position: 'absolute',
    top: 40,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255,238,244,0.88)',
  },
  orbMiddle: {
    position: 'absolute',
    top: '34%',
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(229,216,255,0.28)',
  },
  orbBottom: {
    position: 'absolute',
    bottom: -40,
    left: 40,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: 'rgba(255,193,214,0.34)',
  },
});
