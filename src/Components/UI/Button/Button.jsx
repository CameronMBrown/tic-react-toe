import "./Button.scss"

export default function Button({ className = "", action, children }) {
  const handleClick = (e) => {
    e.preventDefault(e)
    action()
  }

  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {children}
    </button>
  )
}
