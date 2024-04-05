import { useContext } from "react"

//context
import ThemeContext from "../../store/ThemeContext"

// styles
import "./Background.scss"

function Background({ children }) {
  const themeCtx = useContext(ThemeContext)

  return (
    <div className={`App ${themeCtx.darkMode ? "dark" : ""}`}>{children}</div>
  )
}

export default Background
