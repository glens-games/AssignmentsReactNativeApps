import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function SessionScreen() {
    return (
        <SafeAreaProvider>
            <View>
                <Text>Session Screen</Text>
            </View>
        </SafeAreaProvider>
    );
}
