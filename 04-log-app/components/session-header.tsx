import { useLocalStorage } from "@/data/localStorage";
import { createCommonStyles } from "@/styles/common";
import { useAppTheme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function SessionHeader() {
    const {data} = useLocalStorage();
    const {theme} = useAppTheme(data);
    const common = createCommonStyles(theme);

    return (
      <View style={myStyles.header}>
        <View style={myStyles.headerActions}>
          <Pressable onPress={() => {}}
            style={({ pressed }) => [common.helpButton, pressed && common.helpButtonPressed]}
          >
            <Ionicons name="pencil-outline" size={20} color="#FFFFFF" />
          </Pressable>

        </View>
      </View>
    );
}

const myStyles = StyleSheet.create({
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