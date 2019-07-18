import React from 'react';
export const themes = {
    light: {
      background: '#f0f',
    },
    dark: {
      background: '#ff0',
    },
  };
export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: ()=>{}
})