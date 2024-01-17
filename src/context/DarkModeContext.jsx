import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // Detect if user has set a preferred color scheme setting for dark mode - returns a boolean value (use as default value in below custom hook)
  const browserSetting = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    browserSetting,
    "isDarkMode"
  );

  // use the useEffect hook to target DOM elements and update classes to reflecting new style rules to be applied for dark and light modes.
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom hook that consumes the context created above - add to components in code
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkMode provider");
  return context;
}

export { DarkModeProvider, useDarkMode };
