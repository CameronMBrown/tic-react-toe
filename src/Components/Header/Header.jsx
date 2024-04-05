import { useContext } from "react"

// context
import ThemeContext from "../../store/ThemeContext"

// components
import Sidebar from "../Sidebar/Sidebar"

// styles
import "./Header.scss"

function Header() {
  const themeCtx = useContext(ThemeContext)

  return (
    <header>
      {themeCtx.darkMode && (
        <img src="/Img/tic-react-toe-logo-dark-nobg.png" alt="logo" />
      )}
      {!themeCtx.darkMode && (
        <img src="/Img/tic-react-toe-logo-nobg.png" alt="logo" />
      )}
      <Sidebar />
    </header>
  )
}

export default Header
