import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <ul>
                    <img src="" alt="logo" />
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/tutor'>Tutor</Link></li>
                    <li><Link>About</Link></li>
                </ul>
                <div className="button">
                    <Link to='/'><button className="button-login">Log In</button></Link>
                    <Link to='/register'><button className="button-signup" >Sign Up</button></Link>
                </div>        
            </div>
        </header>
    )
}

export default Navbar; 