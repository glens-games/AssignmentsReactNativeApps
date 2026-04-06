import { Stack } from "expo-router";
import { LocalStorageProvider } from "../data/localStorage";

export default function RootLayout() {
  return (
    <LocalStorageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Index", headerTitle: "Timer Tracker" }}/>
        <Stack.Screen name="screens/settings" options={{ title: "Settings", headerTitle: "Settings" }}/>
        <Stack.Screen name="session/[id]"/>

      </Stack>
    </LocalStorageProvider>
  );
}
