import './TutorListCard.css'

const TutorListCard = (props) => {
    return (
        <div className="tutor-list-card">
        <div className="top-part-container">
            <div className="name-and-field-container">
                <h4>{props.tutorFirstName}</h4>
            </div>
            <p>logo</p>
        </div>
    </div>
    )
}

export default TutorListCard