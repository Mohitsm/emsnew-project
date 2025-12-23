// // src/contexts/ThemeContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('ems_theme');
//     const savedSidebarState = localStorage.getItem('ems_sidebar_collapsed');

//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//     }

//     if (savedSidebarState) {
//       setSidebarCollapsed(JSON.parse(savedSidebarState));
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('ems_theme', newTheme);
//     document.documentElement.classList.toggle('dark', newTheme === 'dark');
//   };

//   const toggleSidebar = () => {
//     const newState = !sidebarCollapsed;
//     setSidebarCollapsed(newState);
//     localStorage.setItem('ems_sidebar_collapsed', JSON.stringify(newState));
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         theme,
//         sidebarCollapsed,
//         toggleTheme,
//         toggleSidebar,
//         isDark: theme === 'dark'
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [accentColor, setAccentColor] = useState('emerald'); // emerald, green, teal

  useEffect(() => {
    const savedTheme = localStorage.getItem('ems_theme');
    const savedSidebarState = localStorage.getItem('ems_sidebar_collapsed');
    const savedAccentColor = localStorage.getItem('ems_accent_color');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    if (savedSidebarState) {
      setSidebarCollapsed(JSON.parse(savedSidebarState));
    }

    if (savedAccentColor) {
      setAccentColor(savedAccentColor);
    }

    // Apply EMS brand colors as CSS variables
    applyBrandColors();
  }, []);

  const applyBrandColors = () => {
    const root = document.documentElement;
    
    // EMS Brand Colors based on logo
    root.style.setProperty('--ems-primary', '#047857'); // emerald-700
    root.style.setProperty('--ems-primary-dark', '#065f46'); // emerald-800
    root.style.setProperty('--ems-primary-light', '#10b981'); // emerald-500
    root.style.setProperty('--ems-accent', '#84cc16'); // lime-500
    root.style.setProperty('--ems-accent-light', '#bef264'); // lime-300
    root.style.setProperty('--ems-secondary', '#0ea5e9'); // sky-500
    root.style.setProperty('--ems-warning', '#f59e0b'); // amber-500
    root.style.setProperty('--ems-danger', '#ef4444'); // red-500
    root.style.setProperty('--ems-success', '#22c55e'); // green-500
  };

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

  const changeAccentColor = (color) => {
    setAccentColor(color);
    localStorage.setItem('ems_accent_color', color);
  };

  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        background: 'bg-gray-900',
        surface: 'bg-gray-800',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        border: 'border-gray-700',
        hover: 'hover:bg-gray-700',
      };
    }
    
    return {
      background: 'bg-gray-50',
      surface: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-100',
    };
  };

  const getBrandColors = () => {
    return {
      primary: 'emerald',
      primaryBg: 'bg-emerald-600',
      primaryText: 'text-emerald-600',
      primaryHover: 'hover:bg-emerald-700',
      primaryBorder: 'border-emerald-600',
      accent: 'lime',
      accentBg: 'bg-lime-400',
      accentText: 'text-lime-500',
      secondary: 'sky',
      secondaryBg: 'bg-sky-500',
      secondaryText: 'text-sky-600',
      warning: 'amber',
      warningBg: 'bg-amber-500',
      warningText: 'text-amber-600',
      danger: 'red',
      dangerBg: 'bg-red-500',
      dangerText: 'text-red-600',
      success: 'green',
      successBg: 'bg-green-500',
      successText: 'text-green-600',
    };
  };

  const getSidebarWidth = () => {
    return sidebarCollapsed ? 'w-20' : 'w-64';
  };

  const getMainContentMargin = () => {
    return sidebarCollapsed ? 'ml-20' : 'ml-64';
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        sidebarCollapsed,
        accentColor,
        toggleTheme,
        toggleSidebar,
        changeAccentColor,
        isDark: theme === 'dark',
        isLight: theme === 'light',
        getThemeColors,
        getBrandColors,
        getSidebarWidth,
        getMainContentMargin,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;