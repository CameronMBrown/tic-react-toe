import { useState } from 'react'

export default function Setting({ text, type, initialValue }) {
    const [ value, setValue ] = useState(initialValue)

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    
    return (
        <label>
            {text}
            <input type={type} value={value} className="setting" onChange={handleChange}></input>
        </label>
        
    )
}