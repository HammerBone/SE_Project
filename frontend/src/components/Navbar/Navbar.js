import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import './Navbar.css';


const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = async () => {
        await logout()
    }

    return (
        <header>
            <div className="container">
                <ul>
                    <img src="" alt="logo" />
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/tutor'>Tutor</Link></li>
                    <li><Link>About</Link></li>
                </ul>
                {user && (      
                    <div>
                        {user.username}
                        <button onClick={handleLogout}>Logout bro</button>
                    </div>
                )
                }

                {!user && (
                    <div className="button">
                        <Link to='/login'><button className="button-login">Log In</button></Link>
                        <Link to='/register'><button className="button-signup" >Sign Up</button></Link>
                    </div>    
                )}      
            </div>
        </header>
    )
}

export default Navbar; 