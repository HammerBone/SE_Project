import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import './Navbar.css';
import prof from "../../assets/Picture/profPic.jpg"

const Navbar = () => {
    const { user } = useAuthContext();

    const { logout } = useLogout();
    const [isLoading, setIsLoading] = useState(true);
    const [redirect, setRedirect] = useState(null)
    const [condition, setCondition] = useState(null);

    const { tutorEmail, studentEmail, userRole } = JSON.parse(localStorage.getItem('user')) ?? 'guest';

    const [loggedInTutorData, setLoggedInTutorData] = useState(null);

    useEffect(() => {
        const loggedInUserTutor  = { tutorEmail };
        const loggedInUserStudent = { studentEmail };
        console.log(loggedInUserTutor)
        if(loggedInUserTutor != 'guest') {
            
            if (userRole == 'tutor') {
                
                const getTutorByEmailUrl = '/api/tutor/getTutorByEmail';
                const getLoggedInTutorData = async () => {
                    const response = await fetch(getTutorByEmailUrl, {
                        method: 'POST',
                        body: JSON.stringify(loggedInUserTutor),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const json = await response.json();

                    if (response.ok) {
                        
                        setLoggedInTutorData(json);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500)
                        
                    }
                    if (!response.ok) {
                        console.log("error")
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500)
                    }
                }
                getLoggedInTutorData(); 
            }

            if (userRole == 'student') {
                const getStudentByEmailUrl = '/api/student/getStudentByEmail';
                const getLoggedInStudentData = async () => {
                    const response = await fetch(getStudentByEmailUrl, {
                        method: 'POST',
                        body: JSON.stringify(loggedInUserStudent),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const json = await response.json();
                    
                    if (response.ok) {
                        setLoggedInTutorData(json);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500)
                        
                    }
                    if (!response.ok) {
                        console.log("error")
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500)
                    }
                }
                getLoggedInStudentData(); 
            } 
        }
    }, [user, condition]);

    const handleLogout = async () => {
        await logout()
        setCondition(true);
        setRedirect(true)   ;  
    }

    const handleProfileClick = () =>{
        if(user.userRole == "tutor")
            navigate('/profile')
        else
            navigate('/studentprofile')
    }

    const navigate = useNavigate()

    if(redirect) {
        navigate(0)
        return <Navigate to={'/'}/>
    }

    if (isLoading && loggedInTutorData) {
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
        let username = '';
        if (userRole == 'tutor' && loggedInTutorData) {
            username = loggedInTutorData.tutorFirstName;
        };
        if (userRole == 'student' && loggedInTutorData) {
            username = loggedInTutorData.studentFirstName;
        };

        return (
            <header>
                <div className="container">
                    <ul>
                        {/* <img src="" alt="logo" /> */}
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/tutor'>Tutor</Link></li>
                    </ul>

                    {loggedInTutorData && 
                        (      
                            <div className='navbar-user-info'>
                                <button onClick={handleLogout}>Logout</button>
                                <span>{username}</span>
                                <img 
                                    onClick={handleProfileClick} 
                                    src={ loggedInTutorData.profilePicture 
                                            ? `http://localhost:4000/api/tutor/getTutorProfilePic/${loggedInTutorData.profilePicture}` 
                                            : prof 
                                        } 
                                    alt=""
                                />
                            </div>
                        ) 
                    }

                    {!loggedInTutorData && (
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