import './Improf.css'

const Improf = (props) =>{
    return (
        <div className='kontener'>
            <img className='profileHeader' src={ `http://localhost:4000/api/tutor/getTutorProfilePic/${props.img}`} />
            <img className='profilePicture' src={ `http://localhost:4000/api/tutor/getTutorProfilePic/${props.img}`} />
            <div className='nameDate'>
                <p>{props.name}</p>
                <p>Member Since {props.date}</p>
            </div>
        </div>
    )
}

export default Improf