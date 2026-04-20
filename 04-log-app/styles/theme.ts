export function useAppTheme(data?: any): { isDarkMode: boolean; theme: Theme } {
  const isDarkMode: boolean = data?.options?.darkMode ?? false;
  const theme: any = isDarkMode ? darkTheme : lightTheme;

  return {
    isDarkMode,
    theme,
  };
}

export type Theme = {
  colors: {
    background: string;
    card: string;
    primary: string;
    secondary: string;
    text: string;
    muted: string;
    border: string;
    success: string;
    danger: string;
  };
  spacing: (n: number) => number;
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
};

const base = {
  spacing: (n: number) => n * 8,
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
};

const lightTheme: Theme = {
  ...base,
  colors: {
    background: "#FFFFFF",
    card: "#F9FAFB",
    primary: "#4F8CFF",
    secondary: "#7C3AED",
    text: "#111827",
    muted: "#6B7280",
    border: "#E5E7EB",
    success: "#10B981",
    danger: "#EF4444",
  },
};

const darkTheme: Theme = {
  ...base,
  colors: {
    background: "#0B0F1A",
    card: "#121826",
    primary: "#4F8CFF",
    secondary: "#7C3AED",
    text: "#E5E7EB",
    muted: "#9CA3AF",
    border: "#1F2937",
    success: "#10B981",
    danger: "#EF4444",
  },
};
