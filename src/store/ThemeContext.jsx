import { createContext, useState } from "react"

//TODO: customize token colour
//TODO: customize token shape
const ThemeContext = createContext({
  darkMode: false,
})

export function ThemeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  )

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
