import { useLocalStorage } from "@/data/localStorage";
import { createCommonStyles } from "@/styles/common";
import { Theme, useAppTheme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function IndexHeader() {
    const router = useRouter();
    const {data} = useLocalStorage();
    const {theme} = useAppTheme(data);
    const common = createCommonStyles(theme);
    const styles = createStyles(theme);

    const handleHelp = () => {
        console.log("Open help");
    };

    const handleSettings = () => {
        console.log("Open settings");
        router.push({pathname: '/settings', params: {}});
    };

    return (
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <Pressable onPress={handleHelp}
            style={({ pressed }) => [common.helpButton, pressed && common.helpButtonPressed]}
          >
            <Ionicons name="help-circle-outline" size={20} color="#FFFFFF" />
          </Pressable>
          <Pressable onPress={handleSettings}
            style={({ pressed }) => [common.settingsButton, pressed && common.settingsButtonPressed]}
          >
            <Ionicons name="settings-outline" size={20} color="#4B5563" />
          </Pressable>

        </View>
      </View>
    );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
  });
}
