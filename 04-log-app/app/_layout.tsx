import { IndexHeader } from '@/components/index-header';
import { SessionHeader } from "@/components/session-header";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocalStorageProvider } from "../data/localStorage";

export default function RootLayout() {
  const sessionName = "Session XYZ";

  return (
    <LocalStorageProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" options={{
              title: "Index",
              headerTitle: "Timer Tracker",
              headerRight: () => <IndexHeader />,
            }}/>
            <Stack.Screen name="settings" options={{
              title: "Settings",
              headerTitle: "Settings",
            }}/>
            <Stack.Screen name="session/[id]" options={{
              title: sessionName,
              headerRight: () => <SessionHeader />,
            }}/>
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </LocalStorageProvider>
  );
}
