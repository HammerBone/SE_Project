import { useNavigate, Link } from 'react-router-dom'
import './TutorListCard.css'

const TutorListCard = (props) => {
    const navigate = useNavigate();

    const handleBook = () => {
        navigate('/payment')
    }

    return (
        <div className="tutor-list-card">
            <div className="top-part-container">
                <div className="name-and-field-container">
                    <h4>{props.tutorFirstName}</h4>
                    <h4>{props.tutorField}</h4>
                </div>
            </div>
            <div className="tutor-list-card-img-container">
                <img src={"http://localhost:4000/api/tutor/getTutorProfilePic/" + props.profilePicture} alt="" />
            </div>
            <div className="bottom-part-container">
                <div className="rating-price-container">
                    <h4>{props.tutorPrice}$ /day</h4>
                </div>
                <Link to={'/tutor/' + props.tutorId}><button>Book</button></Link>
            </div>
        </div>
    )
}

export default TutorListCard