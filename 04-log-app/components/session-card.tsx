
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { createCommonStyles } from "@/styles/common";
import { LogSession } from "@/data/localStorage";

export function SessionCard({session, onPress, onLongPress}:
                            {session: LogSession;
                            onPress: () => void;
                            onLongPress: () => void})
{
    const styles = createCommonStyles({ colorScheme: 'light' });

    return (
        <Pressable style={styles.sessionRow} onPress={() => onPress()}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Ionicons name="time-outline" size={14} color="#4B5563" />
                <Text style={styles.sessionItemCount}>{session.items.length} log items</Text>
            </View>
        </Pressable>

        // <Pressable
        //     style={styles.sessionRow}
        //     onPress={onPress}
        //     onLongPress={onLongPress}
        //     delayLongPress={400}
        // >
        //     <View className="flex-1 mr-3">
        //         <Text style={styles.sessionTitle}>{session.name}</Text>
        //         <View className="flex-row items-center gap-1.5">
        //         {/* <LucideIcon name="Clock" size={11} className="text-muted-foreground" /> */}
        //         <Ionicons name="time-outline" size={11} color="#4B5563" />
        //         <Text className="text-caption text-muted-foreground">
        //             {session.logCount} {session.logCount === 1 ? "log" : "logs"}
        //         </Text>
        //         </View>
        //     </View>
        //     <Ionicons name="chevron-forward-outline" size={16} color="#4B5563" />
        // {/* <LucideIcon name="ChevronRight" size={18} className="text-muted-foreground" /> */}
        // </Pressable>
    );
}