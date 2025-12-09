// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('ems_theme');
    const savedSidebarState = localStorage.getItem('ems_sidebar_collapsed');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    if (savedSidebarState) {
      setSidebarCollapsed(JSON.parse(savedSidebarState));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('ems_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('ems_sidebar_collapsed', JSON.stringify(newState));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        sidebarCollapsed,
        toggleTheme,
        toggleSidebar,
        isDark: theme === 'dark'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
