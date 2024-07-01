import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './Payment.css'
import Billing from '../../components/Billing Info/Billing'
import PaymentMethod from '../../components/Payment Method/PaymentMethod'
import Confirmation from '../../components/Confirmation/Confirmation'
import Summary from '../../components/Summary/Summary'
import picture from '../../assets/Picture/home-page-picture-cropped.jpg' 


const Payment =()=>{
    const { id } = useParams();

    const [tutorData, setTutorData] = useState([]);
    const { tutorTotalRating } = tutorData;

    const tutorId = { id }
    const getTutorByIdUrl = `/api/tutor/getTutorById/${id}`;
    useEffect(() => {
        const getTutor = async () => {
            const response = await fetch(getTutorByIdUrl, {
                method: 'POST',
                body: JSON.stringify(tutorId),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json()
            if (response.ok) {
                setTutorData(json);
            }
        }
        
        getTutor();
    }, [])
    
    if (tutorData && tutorTotalRating >= 0) {
        return(
            <div className='Payment-wrapper'>
                <div className='left-wrapper'>
                    <Billing />
                    <PaymentMethod />
                    <Confirmation tutorId={ tutorData._id }/>
                </div>
                <Summary 
                    profileImg ={ tutorData.profilePicture } 
                    name = { tutorData.tutorFirstName }
                    rating = { tutorTotalRating } 
                    totalReviewer={0}
                    price = { tutorData.tutorPrice }
                    tax = { 5 }
                />
            </div>
        )
    }
    
}

export default Payment