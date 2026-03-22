import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, TextInput  } from "react-native";

import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from '@expo/vector-icons/Octicons';
import { TodoItem } from "@/data/todos.ts";
import { useAppStorage } from "@/store/appStorage";
import { createCommonStyles } from "@/styles/common";

export default function EditScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [loaded, error] = useFonts({ Inter_500Medium });
    const { theme, todos, updateTodo, colorScheme, setColorScheme } = useAppStorage();

    const myTodo = todos.find(todo => todo.id === Number(id));

    if (!myTodo) {
        router.push("/");
        return null;
    }

    const [draft, setDraft] = useState<TodoItem>(myTodo);

    if (!loaded && !error) {
        return null;
    }

    const styles = createCommonStyles({theme, colorScheme});

    const handleSave = async () => {
        try {
            updateTodo(myTodo.id, draft);
            router.push("/");
        } catch (e) {
            console.error(e);
        }
    }

    const handleCancel = () => {
        router.push("/");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    maxLength={30}
                    placeholder="Edit todo"
                    placeholderTextColor="gray"
                    value={draft?.title || ""}
                    onChangeText={(text) => setDraft({...draft, title: text} as TodoItem)}
                />
                <Pressable
                    onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                    style={{ marginLeft: 10 }}
                >
                {colorScheme === "dark" ? (
                    <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{ width: 36}} />
                ) : (
                    <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{ width: 36}} />
                )}
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Pressable
                    onPress={handleSave}
                    style={styles.uiButton}
                >
                    <Text style={styles.uiButtonText}>Save</Text>
                </Pressable>
                <Pressable
                    onPress={handleCancel}
                    style={[styles.uiButton, { backgroundColor: "red" }]}
                >
                    <Text style={[styles.uiButtonText, { color: "white" }]}>Cancel</Text>
                </Pressable>
            </View>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </SafeAreaView>
    );

}