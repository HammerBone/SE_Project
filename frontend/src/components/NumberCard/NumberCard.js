import './NumberCard.css'

const NumberCard = ({ number }) => {
    return (
        <div className="number-card">
            <h1>{ number }</h1>
        </div>
    )
}

export default NumberCard;