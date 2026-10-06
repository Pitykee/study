import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    // JAVÍTÁS 2: const-ot nem írhatunk felül, a settert kell hívni
    setTheme((elozo) => (elozo === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }} /* JAVÍTÁS 1: a toggleTheme is kell */
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
