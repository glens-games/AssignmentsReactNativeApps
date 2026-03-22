import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { TodoItem, data } from "@/data/todos";
import { Colors } from "@/constants/Colors";

// update this if there are any major schema updates
const STORAGE_KEY = "TodoApp_v2";

export type AppState = {
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
  updateTodo: (id: number, newTodo: TodoItem) => void; 
  theme: typeof Colors.light | typeof Colors.dark;
  colorScheme: "light" | "dark";
  setColorScheme: (scheme: "light" | "dark") => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
};

export const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(Appearance.getColorScheme() || "light");
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the data once, and only when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = json ? JSON.parse(json) : null;

        setTodos([...(parsed?.todos ?? data)].sort((a, b) => b.id - a.id));

        if (parsed?.colorScheme) {
          setColorScheme(parsed.colorScheme);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Save whenever state changes. This includes the list of TODOs and the color scheme.
  useEffect(() => {
    // If isLoaded is false, we're still loading so we shouldn't save yet
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ todos, colorScheme })
        );
      } catch (e) {
        console.error(e);
      }
    };

    saveData();
  }, [todos, colorScheme, isLoaded]);

  const updateTodo = (id: number, newTodo: TodoItem) => {
    setTodos(prev => prev.map(t => t.id === id ? newTodo : t));
  };

  return (
    <AppContext.Provider value={{ todos, setTodos, updateTodo, theme, colorScheme, setColorScheme, isLoaded, setIsLoaded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStorage = (): AppState => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useApp must be used within AppProvider");
  }
  return appContext;
};
