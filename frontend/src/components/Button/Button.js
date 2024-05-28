import './Button.css'

const SubmitButton = ( props ) => {
    return(
        <button className={props.type}>{props.text}</button>
    )
}

export default SubmitButton;