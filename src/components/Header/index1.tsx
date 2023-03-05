import { Link } from 'react-router-dom';
import './index.css'

function Header(){
    return(
        <header>
            <ul>   
                <li><Link className='Link' to={'/teste'}>Teste1</Link></li>
                <li><Link to={'/teste'}>Teste1</Link></li>
                <li><Link to={'/teste'}>Teste1
                    <ul>
                        <li>drop1</li>
                        <li>drop2</li>
                        <li>drop3</li>
                    </ul>
                </Link></li>
            </ul>
        </header>
    )
}

export default Header;