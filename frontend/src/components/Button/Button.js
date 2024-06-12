import './Button.css'

const SubmitButton = ( props ) => {
    return(
        <button className={props.type} disabled={props.disabled}>{props.text}</button>
    )
}

export default SubmitButton;