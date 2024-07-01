import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Navigate } from 'react-router-dom';

import SubmitButton from '../Button/Button';
import Switch from '../Switch/Switch';
import './LoginForm.css';
import { useStudentLogin } from '../../hooks/useStudentLogin';


const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, redirect, error } = useLogin();
    const { loginStudent, isLoadingStudent, redirectStudent, errorStudent } = useStudentLogin();

    const [isTutor, setIsTutor] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();  
        
        const loginData = {username, password}

        if (isTutor)
            await login(loginData);
        if (!isTutor)
            await loginStudent(loginData);
    };
    
    
    const handleToggle = () => {
        setIsTutor(!isTutor);
    }

    if (redirectStudent && !isTutor) {
        return <Navigate to={'/tutor'}/>
    }
    if (redirect && isTutor) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div className="Lform-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Enter Your Information</h1> 

                <div className="input-container">
                            
                    <div className="input-credentials-container">
                        <div className="input-credentials">
                            <label>Email</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        
                        <div className="input-credentials">
                            <label>Password</label>
                            <input 
                                type="text" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>   
                    </div>
                    <div className="role-choose">
                        <Switch isTutor={handleToggle} />
                    </div>
                </div>
               
                <div className='submit-button-container'>
                    <SubmitButton disabled={isLoading} type="sign-up" text="Log In" />
                </div>
                {error && <div>{error}</div>}
            </form>
            <div className='login-label'>
                <a>LOGIN</a>
            </div>
        </div>
    )
}

export default LoginForm;