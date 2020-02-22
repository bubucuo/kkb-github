import React from "react";

// 创建context 农民种菜, 如果没有匹配到Provider，取值默认值
export const ThemeContext = React.createContext({themeColor: "pink"});
// 接收者 批发商批发菜
export const ThemeProvider = ThemeContext.Provider;

//消费者 吃菜
export const ThemeConsumer = ThemeContext.Consumer;
