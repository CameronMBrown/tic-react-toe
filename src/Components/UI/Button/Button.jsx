import { useContext } from "react"

// context
import ThemeContext from "../../../store/ThemeContext"

// styles
import "./Button.scss"

export default function Button({ className = "", action, children, ...props }) {
  const themeCtx = useContext(ThemeContext)

  const handleClick = (e) => {
    e.preventDefault(e)

    if (!action) return
    action()
  }

  return (
    <button
      className={`btn ${className} ${themeCtx.darkMode ? "dark" : ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
