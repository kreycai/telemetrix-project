import { FC, InputHTMLAttributes } from 'react';
import './index.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    textLabel: string;
    func: any;
}

const Input:FC<InputProps> = ({type, textLabel, name, placeholder, value, func,...rest})=>{
    return (
        <div className='form_control'>
            <label htmlFor={name}>{textLabel}:</label>
            <input 
            type={type} 
            name={name}
            id={name} 
            placeholder={placeholder}
            onChange={func}
            />
        </div>
    )
}

export default Input;