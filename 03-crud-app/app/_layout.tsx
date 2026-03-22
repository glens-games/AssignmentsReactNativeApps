import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "../store/appStorage";

export default function RootLayout() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="todos/[id]"/>
        </Stack>
      </SafeAreaProvider>
    </AppProvider>
  );
}
