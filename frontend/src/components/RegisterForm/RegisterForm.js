import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useSignUp } from '../../hooks/useSignup'

import './RegisterForm.css'
import SubmitButton from '../Button/Button';
import Switch from '../Switch/Switch';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isTutor, setIsTutor] = useState(true)
    
    const { signUp, isLoading, redirect, error } = useSignUp();

    const handleToggle = () => {
        setIsTutor(!isTutor)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const registerData = {firstName, lastName, email, password, isTutor}
        await signUp(registerData);
    }

    if(isTutor && redirect) {
        return <Navigate to={'/CompleteProfile_Tutor'} />
    }
        
    else if(!isTutor && redirect) {
        return <Navigate to={'/tutor'} />
    }
        
    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Enter Your Information</h1>

                <div className="input-container">
                    <div className="input-name-container">
                        <div className="input-name">
                            <label>First Name</label>
                            <input
                                type="text" 
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />            
                        </div>

                        <div className="input-name">
                            <label>Last Name</label>
                            <input
                                type="text" 
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </div>
                    </div>
                            
                    <div className="input-credentials-container">
                        <div className="input-credentials">
                            <label>Email</label>
                            <input 
                                type="text" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        
                        <div className="input-credentials">
                            <label>Password</label>
                            <input 
                                type="text" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>   
                    </div>
                    <div className="role-choose">
                        <Switch isTutor = {handleToggle} />
                    </div>
                </div>
                

                <div className='submit-button-container'>
                    <SubmitButton disabled={isLoading} type="sign-up" text="Sign Up" />
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default RegisterForm;