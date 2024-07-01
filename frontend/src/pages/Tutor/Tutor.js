import { useEffect, useState } from 'react'

import './Tutor.css'
import SideBar from '../../components/SideBar/SideBar'
import TutorListCard from '../../components/TutorListCard/TutorListCard'

const Tutor = () => {
    const base_url = '/api/tutor/filterTutor'

    const [tutorData, setTutorData] = useState([])
    const [selectedField, setSelectedField] = useState([])

    useEffect(() => {
        const fetchTutor = async () => {
            const url = `${base_url}?field=${selectedField.toString()}`
            const response = await fetch(url)
            const json = await response.json()

            if(response.ok) {
                setTutorData(json)
            }
        }
        fetchTutor()
    }, [selectedField])

    //Product Filter
    const handleChange = (e) => {
        if(e.target.checked) {
            const state = [...selectedField, e.target.value]
            console.log(state)
            setSelectedField(state)  
        }
        else {
            const state = selectedField.filter((val) => val !== e.target.value)
            setSelectedField(state)
        }
    }

    return (
        <div className="tutor-page">
            <SideBar handleChange={handleChange}/>
            <div className="tutor-list-container">
                <div className="tutor-card-container">
                    {tutorData && tutorData.map((result) => (
                        <TutorListCard
                            key={result._id} 
                            tutorId = { result._id }
                            tutorFirstName={ result.tutorFirstName } 
                            tutorField={ result.tutorField }
                            tutorPrice={ result.tutorPrice }
                            profilePicture={ result.profilePicture }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tutor;