import Field from './Field/Field'
import Rating from './Rating/Rating'
import './SideBar.css'

const SideBar = ({ handleChange }) => {
    return (
        <div className="sidebar-container">
            <Field handleChange={handleChange}/>
            <br /><br /><br />
            <Rating />
        </div>
    )
}

export default SideBar