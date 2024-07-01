import './Button.css'

const SubmitButton = ( props ) => {

    return(
        <button className={props.type} disabled={props.disabled} onClick={props.onClick}>{props.text}</button>
    )
}

export default SubmitButton;