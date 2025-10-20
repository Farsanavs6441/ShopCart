import React, { createContext, useContext, useState } from 'react';

const lightColors = {
  background: '#ffffff',
  surface: '#f8f9fa',
  card: '#ffffff',
  text: '#000000',
  textSecondary: '#666666',
  border: '#dddddd',
  primary: '#007AFF',
  error: '#FF3B30',
};

const darkColors = {
  background: '#000000',
  surface: '#1c1c1e',
  card: '#2c2c2e',
  text: '#ffffff',
  textSecondary: '#8e8e93',
  border: '#38383a',
  primary: '#0a84ff',
  error: '#FF453A',
};

const ThemeContext = createContext<{
  colors: typeof lightColors;
  isDark: boolean;
  toggleTheme: () => void;
} | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ colors: isDark ? darkColors : lightColors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
