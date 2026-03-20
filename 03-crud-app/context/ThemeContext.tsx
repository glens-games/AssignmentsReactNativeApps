import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";
import { Theme } from "@react-navigation/native";

type ThemeContextType = {
    theme: typeof Colors.light | typeof Colors.dark;
    colorScheme: "light" | "dark";
    setColorScheme: (scheme: "light" | "dark") => void;
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() || "light");
    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

    return (
        <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
