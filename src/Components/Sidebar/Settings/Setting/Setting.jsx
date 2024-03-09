export default function Setting({ text, type, name, value, onChange }) {
  return (
    <label>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        value={value}
        className="setting"
        onChange={onChange}
      ></input>
    </label>
  )
}
