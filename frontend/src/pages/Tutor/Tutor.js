import { useEffect, useState } from 'react'

import './Tutor.css'
import SideBar from '../../components/SideBar/SideBar'
import TutorListCard from '../../components/TutorListCard/TutorListCard'

const Tutor = () => {
    const [tutor, setTutor] = useState([])

    useEffect(() => {
        const fetchTutor = async () => {
            const response = await fetch('/api/tutor/getAllTutor/')
            const json = await response.json()

            if(response.ok) {
                setTutor(json)
            }
        }

        fetchTutor()
    }, [])

    return (
        <div className="tutor-page">
            <SideBar/>
            <div className="tutor-list-container">
                <div className="tutor-card-container">
                    {tutor && tutor.map((tutor) => (
                        <TutorListCard 
                            key={tutor._id} 
                            tutorFirstName={tutor.tutorFirstName} 
                            tutorField={tutor.tutorField}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tutor;