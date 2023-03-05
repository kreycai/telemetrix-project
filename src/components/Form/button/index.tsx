import { FC } from 'react';
import './index.css'

interface ButtonProps {
    text: string;
    func: any;
}

const Button:FC<ButtonProps> = ({text, func}) => {
    return (
        <div className='divFormBut'>
            <button className='buttonForm' onClick={func}>{text}</button>
        </div>
    )
}

export default Button;