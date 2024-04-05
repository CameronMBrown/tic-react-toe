import { createContext, useState } from "react"

// util
import { loadSavedTheme } from "../utils/utils"

//TODO: customize token colour
//TODO: customize token shape
const ThemeContext = createContext({
  darkMode: false,
})

export function ThemeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(loadSavedTheme())

  const themeContext = {
    darkMode,
    handleChangeTheme,
  }

  function handleChangeTheme(isDarkMode) {
    localStorage.setItem("darkMode", isDarkMode)
    setDarkMode(isDarkMode)
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
