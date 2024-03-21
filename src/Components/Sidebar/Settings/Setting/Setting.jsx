import { useRef } from "react"

import "./Setting.scss"

export default function Setting({
  text,
  type,
  name,
  value,
  onChange,
  ...props
}) {
  const input = useRef()

  return (
    <div className="setting">
      <label htmlFor={name}>{text}</label>
      <button
        onClick={(e) => {
          e.preventDefault()
          input.current.stepDown()
        }}
      >
        -
      </button>
      <input
        ref={input}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault()
          input.current.stepUp()
        }}
      >
        +
      </button>
    </div>
  )
}
