import { useState } from 'react';
import './Switch.css'

const Switch = ({ isTutor }) => {
    const [toggled, setToggled] = useState(false)
;
    const handleSwitch = () => {
        setToggled(!toggled);
        isTutor();
    }

    return(
        <div className="switch">
            <button type='button' className={ `toggle-btn ${ toggled ? 'toggled' : "" }` } onClick={handleSwitch}>
                <div className="thumb">{ toggled ? "I am a student" : "I am a tutor" }</div>
                <p>I am a Student</p>
                <p>I am a Tutor</p>
            </button>
        </div>       
    );   
};

export default Switch;