import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';

import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: theme.headerBackground },
                            headerTintColor: theme.text, headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }}/>
      <Stack.Screen name="menu" options={{ title: "Menu", headerTitle: "Coffee Shop Menu", headerShown: true }}/>
      <Stack.Screen name="contact" options={{ title: "Contact", headerTitle: "Contact Us", headerShown: true }}/>
    </Stack>
  );
}
