import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import '../../components/Rating/Rating'
import './TutorDetails.css'
import Rating from "../../components/Rating/Rating";

const TutorDetails = () => {
    const { id } = useParams();
    const [tutorData, setTutorData] = useState(null);
    const [tutorReviewData, setTutorReviewData] = useState(null);

    const getTutorById_Url = `/api/tutor/getTutorById/${id}`;
    const getTutorReviewUrl = `/api/tutor/getReview/${id}`;

    const tutorId = { id }
    useEffect(() => {
        const getTutorById = async () => {
            const response = await fetch(getTutorById_Url, {
                method: 'POST',
                body: JSON.stringify(tutorId),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json()

            if (response.ok) {
                setTutorData(json)
            }
            if (!response.ok) {
                console.log("error")
            }
        };
        
        const getTutorReview = async () => {
            const response = await fetch(getTutorReviewUrl, {
                method: 'POST',
                body: JSON.stringify(tutorId),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (response.ok) {
                setTutorReviewData(json)
            }
            if (!response.ok) {
                console.log("error")
            }
        }
    
        getTutorById();
        getTutorReview();
    }, [id])

    
    
    if (tutorData && tutorReviewData) {
        const dateConverter = (date) => {
            let newDate;
            let newDate_1
            if (date) {
                newDate = date.split("T")[0]
                newDate = newDate.split("-")

                newDate_1 = new Date(newDate[0], newDate[1], newDate[2]).toDateString()
            }

            return newDate_1
        }

        const tutorName = tutorData.tutorFirstName + tutorData.tutorLastName;
        return (
            <div className="tutor-details-container">
                <div className="tutor-details-img">
                    <div className="i-dont-know">
                        <img src={ "http://localhost:4000/api/tutor/getTutorProfilePic/" + tutorData.profilePicture } alt="" />
                        <div className="tutor-details">
                            <div className="tutor-details-inner">
                                <h1>{ tutorName }</h1>
                                <br />
                                <h5 style={{fontWeight: "normal"}}>{ tutorData.tutorDescription }</h5>
                                <br />
                                <h3>Education History</h3>
                                <h5 style={{fontWeight: "normal"}}>{ tutorData.educationBackground }</h5>
                                <br /><br />
                                <h3>${ tutorData.tutorPrice }/<span style={{ fontSize: "15px", fontWeight: "normal"}}>Session</span></h3>
                            </div>
                            <Link to={`/payment/${tutorId.id}`}><button>Book</button></Link>
                        </div> 
                    </div>
                    
                    <br />
                    <div className="student-review-container">
                        <h3>Reviews</h3>
                        <br />
                        { tutorReviewData.map((res) => (
                            <div className="review-list">
                                <div className="review-idty">
                                    <h3>{res.studentName}</h3>
                                    <h5 style={{fontWeight: "normal"}}>Student</h5>
                                    <br />
                                    <h3 style={{fontWeight: "normal"}}>{res.review}</h3>
                                </div>
                                <div className="review-star">
                                    <h6 style={{fontWeight: "600", color: "#90A3BF"}}>{dateConverter(res.date)}</h6>
                                    <Rating rating = {res.rating}/>
                                </div>
                            </div>
                        )) }
                        
                    </div>
                </div>
            </div>
        )
    }
    
}

export default TutorDetails;