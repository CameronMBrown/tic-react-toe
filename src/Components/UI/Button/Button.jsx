import "./Button.scss"

export default function Button({ className = "", action, children, ...props }) {
  const handleClick = (e) => {
    e.preventDefault(e)
    action()
  }

  return (
    <button className={`btn ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
