import { StyleSheet } from "react-native";
import { Theme } from "./theme";

export function createCommonStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            flex: 1,        
            backgroundColor: theme.colors.background,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: '700'
        },
        newSessionBtn: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: theme.colors.primary,
            borderRadius: 6
        },
        newSessionBtnText: {
            color: '#fff',
            fontWeight: '600'
        },
        sessionRow: {
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd'
        },
        sessionTitle: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4
        },
        sessionDate: {
            fontSize: 12,
            color: '#666'
        },
        sessionItemCount: {
            fontSize: 12,
            color: '#999',
            marginTop: 4
        },
        emptyText: {
            textAlign: 'center',
            color: '#999',
            marginTop: 32,
            fontSize: 14
        },
        calendarPlaceholder: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        calendarPlaceholderText: {
            color: '#999'
        },
        viewTabs: {
            flexDirection: "row",
            alignItems: "center",
        },

        // --- Tab group takes remaining space ---
        tabGroup: {
            flex: 1,
            flexDirection: "row",
            marginLeft: 8,
        },

        toggleText: {
            color: theme.colors.muted,
        },

        toggleTextActive: {
            color: '#fff',
            fontWeight: '600',
        },

        helpButton: {
            marginLeft: 8,
            backgroundColor: "#3B82F6",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 8,
        },

        helpButtonPressed: {
            backgroundColor: "#2563EB",
        },

        // --- Settings button ---
        settingsButton: {
            marginLeft: 8,
            marginRight: 8,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            backgroundColor: "#FFFFFF",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 8,
        },

        settingsButtonPressed: {
            backgroundColor: "#DBEAFE",
        },
    });
};
