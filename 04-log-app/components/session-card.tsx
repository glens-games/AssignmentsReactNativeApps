import { LogSession, useLocalStorage } from "@/data/localStorage";
import { createCommonStyles } from "@/styles/common";
import { Theme, useAppTheme } from "@/styles/theme";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export function SessionCard({session, onPress, onDelete}:
                            {session: LogSession;
                            onPress: () => void;
                            onDelete: () => void})
{
    const {data} = useLocalStorage();
    const {theme} = useAppTheme(data);
    const common = createCommonStyles(theme);
    const styles = createStyles(theme);

    const renderRightActions = () => {
        return (
            <Pressable style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
            <View style={styles.swipeContainer}>
                <Pressable style={common.sessionRow} onPress={() => onPress()}>
                    <Text style={common.sessionTitle}>{session.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                        <Ionicons name="time-outline" size={14} color="#4B5563" />
                        <Text style={common.sessionItemCount}>{session.items.length} log items</Text>
                    </View>
                </Pressable>
            </View>
        </Swipeable>
    );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    swipeContainer: {
        backgroundColor: '#fff', // ← solid background (or theme.colors.cardAlt)
        marginHorizontal: 16,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden', // ← ensures clean clipping
    },

    deleteButton: {
        backgroundColor: theme.colors.danger,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        marginBottom: 10,
        borderRadius: 10,
    },

    deleteText: {
        color: '#fff',
        fontWeight: '600',
    },
  });
}