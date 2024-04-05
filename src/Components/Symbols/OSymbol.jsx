import { useContext } from "react"
import ThemeContext from "../../store/ThemeContext"

const OSymbol = ({ fill = "#000000", classes = [] }) => {
  const themeCtx = useContext(ThemeContext)

  if (fill === "#000000") {
    fill = themeCtx.darkMode ? "#FFFFFF" : "#000000"
  }
  classes.push("O")

  return (
    <svg
      className={classes.join(" ")}
      fill={fill}
      height="200px"
      width="200px"
      viewBox="-0.32 -0.32 32.64 32.64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      strokeWidth="0.48"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>circle</title>
        <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z"></path>
      </g>
    </svg>
  )
}

export default OSymbol
