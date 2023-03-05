import { Link } from 'react-router-dom';
import './index.css'

function Header(){
    return(
        <header className='classHeader'>
            <ul className='classUlHead'>   
                <li className='l'><Link className='logo' to={'/'}>TELEMATRIX</Link></li>
                <li className='b'><Link className='button' to={'/categorias'}>Categorias</Link></li>
            </ul>
        </header>
    )
}

export default Header;