import { useMemo } from "react";
import { ThemeContext } from "./themeContext.js";

export function ThemeProvider({ children }) {
  const value = useMemo(() => ({ theme: "light" }), []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
