import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cake-bakery-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('cake-bakery-theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return <ThemeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode((p) => !p) }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
