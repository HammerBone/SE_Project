import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Improf from "../../components/Image Profile/Improf"
import picture from '../../assets/Picture/home-page-picture.jpg' 



const StudentProfile = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'))

    const getStudentByEmailUrl = 'api/student/getStudentByEmail';
    const [loggedInStudentData, setLoggedInStudentData] = useState(null);
    const [bookedTutorData, setBookedTutorData] = useState([]);
console.log(bookedTutorData)
    useEffect(() => {
        const getLoggedInStudentData = async () => {
            const response = await fetch(getStudentByEmailUrl, {
                method: 'POST',
                body: JSON.stringify(loggedInUser),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();

            if (response.ok) {
                setLoggedInStudentData(json)
            }
            if (!response.ok) {
                console.log("error")
            }
        }

        const getBoookedTutorUrl = '/api/student/getBoookedTutor'
        const getBoookedTutor = async () => {
            const response = await fetch(getBoookedTutorUrl, {
                method: 'POST',
                body: JSON.stringify(loggedInUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()

            if (response.ok) {
                setBookedTutorData(json)
            }
        }
        getLoggedInStudentData(); 
        getBoookedTutor();
    }, []);

    const date = (loggedInStudentData && (loggedInStudentData.createdAt).split("T")[0])
    if(loggedInStudentData && bookedTutorData) {
        return (
            <div className="profile">
                <Improf img = { loggedInStudentData.profilePicture } pp = {picture} 
                name = { loggedInStudentData.studentFirstName + ' ' + loggedInStudentData.studentLastName } date = {date} />

                <div className="profile-info">
                    <h1>Tutor Booked</h1>
                    <br />
                    <div className="tutor-info-table" style={{ width: '90%', marginLeft: 20, display: "flex", justifyContent: "space-between", color: "#90A3BF"}}>
                        <h5>Tutor</h5>
                        <h5>Field</h5>
                        <h5>Review Your Tutor</h5>
                    </div>
                    
                    <hr style={{marginLeft: 0, width: "100%"}}/>
                    {bookedTutorData && bookedTutorData.map((res) => (
                        <div style={{width: "100%"}}>
                            <div style={{ width: "90%", marginLeft: 20, display: "flex", justifyContent: "space-between" }}>
                                <h5 style={{marginTop: 5, }}>{res.tutorFirstName}</h5>
                                <h5 style={{marginTop: 5, }}>{res.tutorField}</h5>
                                <Link to={'/review_tutor/' + res._id}><h5>Click to Review</h5></Link>
                            </div>
                            <hr style={{marginLeft: 0, width: "100%"}}></hr>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
    
}

export default StudentProfile;