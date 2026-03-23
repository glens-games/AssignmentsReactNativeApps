import { Stack } from "expo-router";
import { LocalStorageProvider } from "../data/localStorage";

export default function RootLayout() {
  return (
    <LocalStorageProvider>
      <Stack />
    </LocalStorageProvider>
  );
}
