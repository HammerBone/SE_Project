import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

import SubmitButton from '../../components/Button/Button';
import NumberCard from '../../components/NumberCard/NumberCard';
import './ReviewTutor.css'

const ReviewTutor = () => {
    const { user } = useAuthContext();
    const { id: tutorId } = useParams();

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');

    const navigate = useNavigate();

    const rateTutor = async (e) => {
        e.preventDefault()
        try {
            if (user) {
                const { studentEmail } = user;
                const data = { studentEmail, rating, review, tutorId };
                const rateTutorUrl = '/api/tutor/rateTutor';

                const response = await fetch(rateTutorUrl, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert("Thanks for reviewing")
                    navigate('/')
                }  
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
    if (user) {
        return (
            <div className="review-tutor-container">
                <form className="review-tutor-form" onSubmit={rateTutor}>
                    <h1>Rate Your Tutor</h1>
                    <h5>Liam</h5>
                    <br /><br /><br />
                    
                    <div className="rating-container">
                        <textarea type="text" onChange={(e) => setReview(e.target.value)}/>
                        <div>
                            <div className="rating-number">
                                <NumberCard number='1' />
                                <NumberCard number='2' />
                                <NumberCard number='3' />
                                <NumberCard number='4' />
                                <NumberCard number='5' />
                            </div>
                            <div className="rating-checkbox-container" onChange={(e) => setRating(e.target.value)}>
                                <input type="radio" name='rating' value='1'/>
                                <input type="radio" name='rating' value='2'/>
                                <input type="radio" name='rating' value='3'/>
                                <input type="radio" name='rating' value='4'/>
                                <input type="radio" name='rating' value='5'/>
                            </div>
                        </div>    
                    </div>
                    <SubmitButton disabled={false} type="sign-up" text="Submit"/>
                </form>
            </div>
        )
    }
    
}

export default ReviewTutor;