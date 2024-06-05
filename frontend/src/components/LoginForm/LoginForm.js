import { useState } from 'react'
// import axios from 'axios'
import './LoginForm.css'
import SubmitButton from '../Button/Button'

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        // e.preventDefault();
        // try {
        //   const response = await axios.post('http://localhost:5000/login', {
        //     username,
        //     password,
        //   });
        //   setMessage(response.data.message);
        // } catch (error) {
        //   setMessage(error.response.data.message);
        // }
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
                            />
                        </div>
                        
                        <div className="input-credentials">
                            <label>Password</label>
                            <input 
                                type="text" 
                            />
                        </div>   
                    </div>
                </div>

                <div className='submit-button-container'>
                    <SubmitButton type="sign-up" text="Sign Up" />
                </div>
            
            </form>
            <div className='login-label'>
                <a>LOGIN</a>
            </div>
        </div>
    )
}

export default LoginForm;