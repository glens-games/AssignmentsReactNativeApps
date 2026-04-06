import { createCommonStyles } from "@/styles/common";
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

export function SessionHeader() {
    const router = useRouter();
    const styles = createCommonStyles({ colorScheme: 'light' });

    return (
      <View style={myStyles.header}>
        <View style={myStyles.headerActions}>
          <Pressable onPress={() => {}}
            style={({ pressed }) => [styles.helpButton, pressed && styles.helpButtonPressed]}
          >
            <Ionicons name="pencil-outline" size={20} color="#FFFFFF" />
          </Pressable>

        </View>
      </View>
    );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },

  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },

  headerButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  headerButtonText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  sessionRow: {
    backgroundColor: theme.colors.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },

  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },

  sessionDate: {
    fontSize: 12,
    color: theme.colors.muted,
  },

  sessionItemCount: {
    fontSize: 12,
    color: theme.colors.muted,
  },

  emptyText: {
    textAlign: 'center',
    color: theme.colors.muted,
  },

  footer: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },

  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: theme.colors.text,
  },

  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});