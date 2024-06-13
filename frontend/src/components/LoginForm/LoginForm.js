import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

import SubmitButton from '../Button/Button';
import './LoginForm.css';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, redirect, error } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();  
        
        const loginData = {username, password}

        await login(loginData);
    };

    if (redirect) {
        return <Navigate to={'/tutor'}/>
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
                </div>

                <div className='submit-button-container'>
                    <SubmitButton disabled={isLoading} type="sign-up" text="Sign Up" />
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