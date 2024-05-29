import { useEffect, useState } from 'react'

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
            <div className="tutor-list">
                {tutor && tutor.map((tutor) => (
                    <TutorListCard key={tutor._id} tutorFirstName={tutor.tutorFirstName}/>
                ))}
            </div>
        </div>
    )
}

export default Tutor;