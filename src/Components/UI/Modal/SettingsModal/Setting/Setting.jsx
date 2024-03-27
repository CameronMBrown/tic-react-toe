import Button from "../../../Button/Button"

import "./Setting.scss"

export default function Setting({
  text,
  type,
  name,
  value,
  onIncrement,
  onDecrement,
  onChange,
  ...props
}) {
  return (
    <>
      {type === "number" && (
        <div className="setting">
          <label htmlFor={name}>{text}</label>
          <div className="input-wrapper">
            <Button
              className="setting-decrement-btn"
              type="button"
              onClick={() => {
                onIncrement(name, value - 1)
              }}
            >
              -
            </Button>
            <input
              className="setting-input"
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              {...props}
            ></input>
            <Button
              className="setting-increment-btn"
              type="button"
              onClick={() => {
                onIncrement(name, value + 1)
              }}
            >
              +
            </Button>
          </div>
        </div>
      )}
      {type === "checkbox" && (
        <label htmlFor={name} className="setting">
          {text}
          <div className="switch">
            <input
              className="setting-toggle"
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              {...props}
            ></input>
            <span className="slider"></span>
          </div>
        </label>
      )}
    </>
  )
}
