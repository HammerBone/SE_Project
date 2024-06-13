import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import './Navbar.css';

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [isLoading, setIsLoading] = useState(true);
    const [redirect, setRedirect] = useState(null)
    const [condition, setCondition] = useState(null);

    const getTutorByEmailUrl = 'api/tutor/getTutorByEmail';

    const loggedInUser = JSON.parse(localStorage.getItem('user'))

    const [loggedInTutorData, setLoggedInTutorData] = useState(null);

    useEffect(() => {
        if(loggedInUser) {
            const getLoggedInTutorData = async () => {
                const response = await fetch(getTutorByEmailUrl, {
                    method: 'POST',
                    body: JSON.stringify(loggedInUser),
                    headers: { 'Content-Type': 'application/json' }
                });
                const json = await response.json();
    
                if (response.ok) {
                    setLoggedInTutorData(json);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000)
                    
                }
                if (!response.ok) {
                    console.log("error")
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000)
                }
            }
            getLoggedInTutorData(); 
        }
    }, [user, condition]);

    const handleLogout = async () => {
        await logout()
        setCondition(true);
        setRedirect(true)   ;  
    }

    if(redirect) {
        return <Navigate to={'/'}/>
    }

    if (isLoading && user) {
        return (
            <div className="loading-anim-container">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div> 
        )
    }
    else {
        return (
            <header>
                <div className="container">
                    <ul>
                        <img src="" alt="logo" />
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/tutor'>Tutor</Link></li>
                        <li><Link>About</Link></li>
                    </ul>

                    {user &&
                        (      
                            <div className='navbar-user-info'>
                                <button onClick={handleLogout}>Logout</button>
                                <span>{loggedInTutorData.tutorFirstName}</span>
                                <img src={ `http://localhost:4000/api/tutor/getTutorProfilePic/${loggedInTutorData.profilePicture}`} alt="" />
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
}

export default Navbar; 