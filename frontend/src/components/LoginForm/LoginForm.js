import { useState } from 'react'
import './LoginForm.css'
import SubmitButton from '../Button/Button'

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();  
        setError('');
        
        const login = {username, password}
        
        const url = '/api/tutor/tutorValidation/'
        try {
            // console.log(username, password)
            const response = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(login),
              headers: {
                  'Content-Type': 'application/json',
                },
            });
            console.log(response)
            const data = await response.json();
            // console.log(username)
          if (response.ok) {
            console.log('Login successful:', data);
            // Handle login success (e.g., store the token, redirect, etc.)
          } else {
            setError('data.username');
            console.log(data)
          }
        } catch (error) {
          setError(error.message);
        }
      };
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
                    <SubmitButton type="sign-up" text="Sign Up" />
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