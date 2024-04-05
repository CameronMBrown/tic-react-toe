import { useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

// context
import ThemeContext from "../../../store/ThemeContext"

// styles
import "./Modal.scss"

function Modal({ children, open, className = "", onClose }) {
  const themeCtx = useContext(ThemeContext)
  const dialog = useRef()

  useEffect(() => {
    const modal = dialog.current

    if (open) {
      modal.showModal()
    }

    return () => modal.close()
  }, [open])

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className} ${themeCtx.darkMode ? "dark" : ""}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  )
}

export default Modal
