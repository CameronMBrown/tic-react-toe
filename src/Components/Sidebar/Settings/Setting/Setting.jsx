import { useRef } from "react"

import Button from "../../../UI/Button/Button"

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
      <div className="input-wrapper">
        <Button
          className="setting-decrement-btn"
          onClick={(e) => {
            e.preventDefault()
            input.current.stepDown()
          }}
        >
          -
        </Button>
        <input
          className="setting-input"
          ref={input}
          type={type}
          value={value}
          onChange={onChange}
          {...props}
        ></input>
        <Button
          className="setting-increment-btn"
          onClick={(e) => {
            e.preventDefault()
            input.current.stepUp()
          }}
        >
          +
        </Button>
      </div>
    </div>
  )
}
