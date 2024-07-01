import './Improf.css'
import prof from "../../assets/Picture/profPic.jpg"
import cover from "../../assets/Picture/cover.jpg"

const Improf = (props) =>{
    return (
        <div className='kontener'>
            <img className='profileHeader' src={ props.img ? `http://localhost:4000/api/tutor/getTutorProfilePic/${props.img}` : cover} />
            <img className='profilePicture' src={ props.img ? `http://localhost:4000/api/tutor/getTutorProfilePic/${props.img}` : prof} />
            <div className='nameDate'>
                <p>{props.name}</p>
                <p>Member Since {props.date}</p>
            </div>
        </div>
    )
}

export default Improf