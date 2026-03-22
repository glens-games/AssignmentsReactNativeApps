import { Text, View, TextInput, Pressable, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState } from "react";
import { useAppStorage } from "@/store/appStorage.tsx";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter/index.js";
import Animated, { LinearTransition } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { TodoItem } from "../data/todos.ts";
import { useRouter } from "expo-router";
import { createCommonStyles } from "@/styles/common.ts";

export default function Index() {
  const [text, setText] = useState("");
  const [loaded, error] = useFonts({ Inter_500Medium });
  const router = useRouter();

  const { theme, todos, setTodos, colorScheme, setColorScheme } = useAppStorage();

  const styles = useMemo(
    () => createCommonStyles({ theme, colorScheme }),
    [theme, colorScheme]
  );

  if (!loaded && !error) {
     return null;
  }
  
  const addTodo = () => {
    if (text.trim() === "") return;

    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    setTodos([{ id: newId, title: text, completed: false }, ...todos]);
    setText("");
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo: TodoItem) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const handlePress = (id: number) => {
    router.replace({ pathname: "/todos/[id]", params: { id: id.toString() } });
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo: TodoItem) => todo.id !== id));
  }

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
    <View style={styles.todoItem}>
      <Pressable
        onPress={() => handlePress(item.id)}
        onLongPress={() => toggleTodo(item.id)}
      >
        <Text
          style={[styles.todoText, item.completed && styles.completedText]}
        >{item.title}</Text>
      </Pressable>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
          onPress={() => removeTodo(item.id)} />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Add a new Todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable
          style={styles.uiButton}
          onPress={addTodo}
        >
          <Text style={styles.uiButtonText}>Add</Text>
        </Pressable>
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
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
        >
      </Animated.FlatList>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
