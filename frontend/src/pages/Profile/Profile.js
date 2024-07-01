import { useEffect, useState } from 'react'

import Improf from "../../components/Image Profile/Improf"
import picture from '../../assets/Picture/home-page-picture.jpg' 
import './Profile.css'

const Profile = ()=> {
    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    const getTutorByEmailUrl = 'api/tutor/getTutorByEmail';
    const [loggedInTutorData, setLoggedInTutorData] = useState(null);

    useEffect(() => {
        const getLoggedInTutorData = async () => {
            const response = await fetch(getTutorByEmailUrl, {
                method: 'POST',
                body: JSON.stringify(loggedInUser),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();

            if (response.ok) {
                setLoggedInTutorData(json)
            }
            if (!response.ok) {
                console.log("error")
            }
        }
        getLoggedInTutorData(); 
    }, []);

    const date = (loggedInTutorData && (loggedInTutorData.createdAt).split("T")[0])
    return (
        <div className="profile">
            <Improf img = {loggedInTutorData &&loggedInTutorData.profilePicture} pp = {picture} 
            name = {loggedInTutorData && loggedInTutorData.tutorFirstName + loggedInTutorData.tutorLastName} date = {date} />

            <div className="profile-info">
                <h1>About Me</h1>
                <p>{loggedInTutorData &&loggedInTutorData.tutorDescription}</p>
            </div>
        </div>
    )
}

export default Profile