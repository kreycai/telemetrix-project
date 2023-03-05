import { FC, InputHTMLAttributes } from 'react';
import './index.css'

interface optionsTyp {
    id: number;
    text: string;
    bool: boolean;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    textLabel: string;
    options: Array<optionsTyp>;
    func: any;
    
    
}

const Select:FC<SelectProps> = ({type, name, value, textLabel, options, func, ...rest})=>{
    return (
        <div className='form_control'>
            <label htmlFor={name}>{textLabel}:</label>
            <select name={name} id={name} onChange={func}>
                <option>Selecione uma opção</option>
                {options.map((option)=>(
                    <option 
                    value={option.id} 
                    key={option.id}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;