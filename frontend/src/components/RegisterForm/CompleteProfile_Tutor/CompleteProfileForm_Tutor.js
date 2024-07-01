import { useEffect, useState } from 'react'
import './CompleteProfileForm_Tutor.css'
import SubmitButton from '../../Button/Button'
import { Navigate, useNavigate } from 'react-router-dom';

const CompleteProfileForm_Tutor = () => {
    const [fieldData, setFieldData] = useState([]);
    const [tutorField, setTutorField] = useState('');
    const [subField, setSubField] = useState([]);
    const [tutorSubField, setTutorSubField]  = useState('');
    const [educationBackground, setEducationBackground] = useState('');
    const [tutorDescription, setTutorDescription] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [tutorPrice, setTutorPrice] = useState('')

    const [hidden, setHidden] = useState(false)
    const [Redirect, setRedirect] = useState(null);

    const getTutorByEmailUrl = 'api/tutor/getTutorByEmail'
    const tutorFieldUrl = '/api/tutorField/getAllTutorField';
    const createTutorProfileUrl = '/api/tutor/createTutorProfile' 

    const user  = JSON.parse(localStorage.getItem('user'))

    const [loggedInTutor, setLoggedInTutor] = useState(null);

    useEffect(() => {
        const getLoggedInTutorData = async () => {
            const response = await fetch(getTutorByEmailUrl, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await response.json();

            const tutorName = json.tutorFirstName + " " + json.tutorLastName

            if (response.ok) {
                setLoggedInTutor(tutorName)
            }
            if (!response.ok) {
                console.log("error")
            }

        }
        getLoggedInTutorData();
    }, []);

    useEffect(() => {
        const getField = async () => {
            const response = await fetch(tutorFieldUrl)
            const json = await response.json()
    
            if(response.ok) {
                setFieldData(json)
            }
        }
        getField()
    }, []) 
    
    useEffect(() => {
        const field = fieldData.filter((res) => res.tutorFieldName === tutorField)
        field.map((res) => setSubField(res.tutorSubFieldName) )
    }, [tutorField])

    const tutorProfileData = { tutorField, tutorSubField, profilePicture, educationBackground, tutorDescription, tutorPrice, tutorEmail: user.tutorEmail }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(createTutorProfileUrl, {
                method: 'POST',
                body: JSON.stringify(tutorProfileData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRedirect(true)
            const json = await response.json()
            
        } catch (error) {
            
        }
    }

    const uploadPhoto = (e) => {
        const pic = e.target.files;
        const data = new FormData();
        
        for(let i = 0; i < pic.length; i++){
            data.append('profilePic', pic[i])
        }

        fetch('api/tutor/upload', {
            method: 'POST',
            body: data
        }).then(async (res) => {
            const json = await res.json()
            setProfilePicture(json);
            setHidden(true)
        })
    }

    const navigate = useNavigate();
    const handleRedirect = () => {"tes"}
      
    if (Redirect) {
        navigate('/profile');
    }
    
    return (
        <div className="complete-profile-tutor-form-container">
            <form className="complete-profile-tutor-form" onSubmit={handleSubmit}>
                <h1>Complete Your Profile</h1>

                <div className="complete-profile-tutor-info-container">
                    <div className="complete-tutor-input-ddl-container">
                        <div className="complete-profile-tutor-ddl-container">
                            <select onChange={(e) => setTutorField(e.target.value)}>
                                <option disabled="">Select Field</option>
                                {fieldData && fieldData.map((res) => (
                                    <option key={res._id} value={res.tutorFieldName}>
                                        {res.tutorFieldName}
                                    </option> 
                                ))}
                            </select>
                            <select onChange={(e) => setTutorSubField(e.target.value)} >
                                <option disabled="">Select Sub-Field</option>
                                {subField && subField.map((res) => (
                                    <option key={res} value={res} >
                                        {res}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="complete-profile-tutor-input-container">
                            <input 
                                type="text" 
                                placeholder='Education Background'
                                value={educationBackground}
                                onChange={(e) => setEducationBackground(e.target.value)}
                            />
                            <input 
                                className="input-dscr" 
                                type="text" 
                                placeholder='Describe Yourself'
                                value={tutorDescription}
                                onChange={(e) => setTutorDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <section className="complete-profile-tutor-catalog-preview-container">
                        <div className='complete-profile-tutor-catalog-preview'>
                                <div className="upLeft-catalog-preview-container">
                                    <h3 style={{fontWeight: "800"}}>{loggedInTutor}</h3>
                                    <h6>{tutorSubField}</h6>
                                </div>
                                <div className="upload-photo-catalog-preview-container">
                                    <label htmlFor="upload" hidden={hidden}>Upload</label>
                                    <input id="upload" type="file" style={{display: "none"}} onChange={uploadPhoto}/>
                                    <img src={"http://localhost:4000/api/tutor/getTutorProfilePic/" + profilePicture} alt="" />
                                </div>
                                <h3>${tutorPrice}/<span>day</span></h3>
                        </div>
                        <input className='input-price-cpf-t' type="text" placeholder='Set Your Price' 
                        value={tutorPrice}
                        onChange={(e) => setTutorPrice(e.target.value)}/>
                    </section>
                </div>
                <div className="cpt-btn-container" >
                    <SubmitButton type="sign-up" text="Complete Your Profile" onClick={handleRedirect}/> 
                </div>   
            </form>
        </div>
    )
}

export default CompleteProfileForm_Tutor