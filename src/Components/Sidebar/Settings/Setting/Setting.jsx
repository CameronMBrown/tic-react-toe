export default function Setting({ text, type, name, value, onChange }) {
  return (
    <div className="setting">
      <label htmlFor={name}>{text}</label>
      <input type={type} value={value} onChange={onChange}></input>
    </div>
  )
}
