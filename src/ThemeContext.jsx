
import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children, selectedTheme, setSelectedTheme }) {
  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}