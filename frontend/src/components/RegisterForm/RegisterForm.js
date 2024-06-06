import { useState } from 'react'

import './RegisterForm.css'
import SubmitButton from '../Button/Button'

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const register = {firstName, lastName, email, password}
        const url = '/api/tutor/createTutor/';

        try {
            const response = await fetch(url, {
                method:'POST',
                body: JSON.stringify(register),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setError(null)
            }
        }
        catch (error){
            console.log(error.message)
        }
        
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
                </div>

                <div className='submit-button-container'>
                    <SubmitButton type="sign-up" text="Sign Up" />
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default RegisterForm;