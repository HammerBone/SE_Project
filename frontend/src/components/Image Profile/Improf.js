import './Improf.css'

const Improf = (props) =>{
    return (
        <div className='kontener'>
            <img className='profileHeader' src={ props.img } />
            <img className='profilePicture' src={props.pp} />
            <div className='nameDate'>
                <p>{props.name}</p>
                <p>{props.date}</p>
            </div>
        </div>
    )
}

export default Improf