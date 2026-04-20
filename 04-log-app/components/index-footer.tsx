import { useLocalStorage } from "@/data/localStorage";
import { useAppTheme } from "@/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function IndexFooter({searchQuery, setSearchQuery, onCalendarPress, onNewSession}:
                            {searchQuery: string;
                             setSearchQuery: (value: string) => void;
                             onCalendarPress: () => void;
                             onNewSession: () => void}) {
    const {data} = useLocalStorage();
    const {theme} = useAppTheme(data);

    const styles2 = StyleSheet.create({
    container: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#DBEAFE",
        backgroundColor: "#EFF6FF", // fallback for gradient
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    searchWrapper: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },

    searchIcon: {
        position: "absolute",
        left: 12,
        zIndex: 1,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingVertical: 10,
        paddingLeft: 36, // space for icon
        paddingRight: 12,
    },

    footer: {
        padding: 12,
        paddingBottom: 0,
        gap: 10,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
    },

    searchRow: {
        flexDirection: 'row',
        gap: 8,
    },

    searchInput: {
        flex: 1,
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        paddingHorizontal: 12,
        color: theme.colors.text,
    },

    calendarButton: {
        width: 44,
        height: 44,
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    newButton: {
        backgroundColor: theme.colors.primary,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    newButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    fab: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: "#3B82F6",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4, // Android shadow
    },

    fabPressed: {
        opacity: 0.8,
    },
    });

    return (
      <View style={styles2.footer}>
        
        {/* Search + Calendar */}
        <View style={styles2.searchRow}>
          <TextInput
            placeholder="Search or filter by date..."
            placeholderTextColor={theme.colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles2.searchInput}
          />

          <Pressable style={styles2.calendarButton} onPress={onCalendarPress}>
            <Ionicons name="calendar-outline" size={18} color="#4B5563" />
          </Pressable>
        </View>

        {/* New Session Button */}
        <Pressable style={styles2.newButton} onPress={onNewSession}>
          <Text style={styles2.newButtonText}>New Session</Text>
        </Pressable>
      </View>
   );
}