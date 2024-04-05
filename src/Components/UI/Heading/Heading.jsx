import { useContext } from "react"

// context
import ThemeContext from "../../../store/ThemeContext"

// styles
import "./Heading.scss"

function Heading({ headingLvl = "h2", className, children }) {
  const themeCtx = useContext(ThemeContext)

  return (
    <div className={`heading-wrapper ${themeCtx.darkMode ? "dark" : ""}`}>
      {headingLvl === "h1" && (
        <h1 className={`heading ${className}`}>{children}</h1>
      )}
      {headingLvl === "h2" && (
        <h2 className={`heading ${className}`}>{children}</h2>
      )}
      {headingLvl === "h3" && (
        <h3 className={`heading ${className}`}>{children}</h3>
      )}
      {headingLvl === "h4" && (
        <h4 className={`heading ${className}`}>{children}</h4>
      )}
    </div>
  )
}

export default Heading
