import { Pressable, Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { createCommonStyles } from "@/styles/common";
import { LogSession } from "@/data/localStorage";
import { theme } from "@/styles/theme";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export function SessionCard({session, onPress, onDelete}:
                            {session: LogSession;
                            onPress: () => void;
                            onDelete: () => void})
{
    const styles = createCommonStyles({ colorScheme: 'light' });

    const renderRightActions = () => {
        return (
            <Pressable style={myStyles.deleteButton} onPress={onDelete}>
                <Text style={myStyles.deleteText}>Delete</Text>
            </Pressable>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
            <View style={myStyles.swipeContainer}>
                <Pressable style={styles.sessionRow} onPress={() => onPress()}>
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                        <Ionicons name="time-outline" size={14} color="#4B5563" />
                        <Text style={styles.sessionItemCount}>{session.items.length} log items</Text>
                    </View>
                </Pressable>
            </View>
        </Swipeable>
    );
}

const myStyles = StyleSheet.create({
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
