import { useState, useEffect } from 'react';
import './Field.css'

const Field = ({ handleChange }) => {
    const [tutorFieldData, setTutorFieldData] = useState([])

    useEffect(() => {
        const fetchTutorField = async () => {
            const response = await fetch('/api/tutorField/getAllTutorField')
            const json = await response.json()

            if(response.ok) {
                setTutorFieldData(json)
            }
        }
        fetchTutorField()
    }, [])
    
    return (
        <div className="field-container">
            <h2 className="field-title">Field</h2>

            <div>
                {tutorFieldData.map((tutorField) => (
                    <label className="sidebar-field-label-container">
                        <input 
                            onChange={handleChange} 
                            type="checkbox" 
                            value={tutorField.tutorFieldName} 
                        />
                        <span className="sidebar-field-checkmark"></span>
                        {tutorField.tutorFieldName}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default Field;