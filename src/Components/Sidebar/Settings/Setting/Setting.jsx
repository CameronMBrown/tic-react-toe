export default function Setting({
  text,
  type,
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <div className="setting">
      <label htmlFor={name}>{text}</label>
      <input type={type} value={value} onChange={onChange} {...props}></input>
    </div>
  )
}
