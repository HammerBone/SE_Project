import './TutorListCard.css'

const TutorListCard = (props) => {
    return (
        <div className="tutor-list-card">
            <div className="top-part-container">
                <div className="name-and-field-container">
                    <h4>{props.tutorFirstName}</h4>
                    <h4>{props.tutorField}</h4>
                </div>
                <p>logo</p>
            </div>
            <img src={"http://localhost:4000/api/tutor/getTutorProfilePic/" + props.profilePicture} alt="" />
            <div className="bottom-part-container">
                <div className="review-details-container">
                    <h4>Review</h4>
                </div>
                <div className="rating-price-container">
                    <h4>{props.tutorPrice}</h4>
                </div>
                {/* <button></button> */}
            </div>
        </div>
    )
}

export default TutorListCard