import React, { Component } from 'react';
// export const MyContext = React.createContext({});
export const themes = {
  light: {
    background: '#ff00ff',
  },
  dark: {
    background: '#ff0',
  },
};

export const MyContext = React.createContext(
  themes.light // 默认值
);
