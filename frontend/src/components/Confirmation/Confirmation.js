import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';

import './Confirmation.css'
import logo from '../../assets/Picture/Layer.png'

const Confirmation = (props) =>{
    const navigate =useNavigate();
    const { user } = useAuthContext();
    const { id: tutorId } = useParams();

    const { studentEmail } = user;

    const handleBook = async (e) => {
        e.preventDefault();
        const data = { studentEmail, tutorId }
        const bookTutorUrl = '/api/student/bookTutor'
        const response = await fetch(bookTutorUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (response.ok) {
            alert("Your Payment is complete")
            navigate('/')
        }     
    }

    return(
        <div className='confirmation-wrapper'>
            <div className='text'>
                <h3>Confirmation</h3>
                <div className='text-container'>
                    <p>We are getting to the end. Just few clicks and your book is ready</p>
                    <p>Step 3 of 3</p>
                </div>
            </div>
            <form className='form-wrapper'>
                <div className='text-wrapper'>
                    <input type='checkbox'></input>
                    <label>I agree with sending an Marketing and newsletter emails. No spam, promissed!</label>
                </div>
                <div className='text-wrapper'>
                    <input type='checkbox'></input>
                    <label>I agree with our terms and conditions and privacy policy.</label>
                </div>
                <button onClick={handleBook}>Book Now</button>
            </form>
            <div className='bawahan'>
                <img src={logo}></img>
                <div className='text-wrapper'>
                    <h3>All your data are safe</h3>
                    <p>We are using the most security to provide you the best experience</p>
                </div>
            </div>
        </div>
    )
}

export default Confirmation