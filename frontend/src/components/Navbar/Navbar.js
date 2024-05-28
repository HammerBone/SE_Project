import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <ul>
                    <img src="" alt="logo" />
                    <li><Link>Home</Link></li>
                    <li><Link>Mentors</Link></li>
                    <li><Link>Courses</Link></li>
                    <li><Link>About</Link></li>
                </ul>
                <div className="button">
                    <Link><button className="button-login">Log In</button></Link>
                    <Link to='/register'><button className="button-signup" >Sign Up</button></Link>
                </div>        
            </div>
        </header>
    )
}

export default Navbar; 