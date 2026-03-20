import { Text, View, TextInput, Pressable, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter/index.js";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { TodoItem, data } from "../data/todos.ts";

const AsyncStorageName = "TodoApp_v2";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([] as TodoItem[]);
  const [text, setText] = useState("");
  const [loaded, error] = useFonts({ Inter_500Medium });
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(AsyncStorageName);

        if (jsonValue != null) {
          const parsedJSon = JSON.parse(jsonValue);

          // Load the TODOs and the Color Scheme, but only if they exist in the storage
          parsedJSon?.colorScheme && setColorScheme(parsedJSon.colorScheme);
          setTodos([...(parsedJSon?.todos ?? data)].sort((a, b) => b.id - a.id));
        }
        else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }

        setIsLoaded(true);
      }
      catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify({ todos, colorScheme });
        await AsyncStorage.setItem(AsyncStorageName, jsonValue);
      }
      catch (e) {
        console.error(e);
      }
    }

    storeData();
  }, [todos, isLoaded, colorScheme]);
  

  if (!loaded && !error) {
     return null;
  }
  
  const styles = createStyles({theme, colorScheme});

  const addTodo = () => {
    if (text.trim() === "") return;

    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    setTodos([{ id: newId, title: text, completed: false }, ...todos]);
    setText("");
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id)}
      >{item.title}</Text>
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
          placeholder="Add a new Todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable
          style={styles.addButton}
          onPress={addTodo}
        >
          <Text style={styles.addButtonText}>Add</Text>
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

function createStyles({theme, colorScheme} : {
                        theme: typeof Colors.light | typeof Colors.dark;
                        colorScheme: "light" | "dark"
                      }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme.text,
    },
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
      padding: 10,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      color: theme.text,
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
};
