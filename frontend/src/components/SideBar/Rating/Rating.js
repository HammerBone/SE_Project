import './Rating.css'

const Rating = () => {
    return (
        <div className="rating-container">
            <h2 className="rating-title">Rating</h2>

            <div>
                <label className="sidebar-field-label-container">
                    <input type="checkbox" value="Tech" />
                    <span className="checkmark"></span>Tech
                </label>
                <label className="sidebar-field-label-container">
                    <input type="checkbox" name="" />
                    <span className="checkmark"></span>Sport
                </label>
                <label className="sidebar-field-label-container">
                    <input type="checkbox" name="" />
                    <span className="checkmark"></span>AI
                </label>
                <label className="sidebar-field-label-container">
                    <input type="checkbox" name="" />
                    <span className="checkmark"></span>Math
                </label>
                <label className="sidebar-field-label-container">
                    <input type="checkbox" name="" />
                    <span className="checkmark"></span>Music
                </label>
            </div>
        </div>
    )
}

export default Rating;