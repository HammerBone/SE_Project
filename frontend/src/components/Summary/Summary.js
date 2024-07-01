import './Summary.css'
import Rating from '../Rating/Rating'
const Summary = (props) =>{
    const totalPrice = props.price + props.tax;

    const star = props.rating
    return(
        <div className='Summary-wrapper'>
            <div className='text'>
                <h3>Rental Summary</h3>
                <div className='text-container'>
                    <p>Prices may change depending on the length of the tutor session.</p>
                </div>
            </div>
            <div className='isi-wrapper'>
                <div className='profile-details'>
                    <img src={`http://localhost:4000/api/tutor/getTutorProfilePic/${props.profileImg}`}></img>
                    <div className='namrat'>
                        <h3>{props.name}</h3>
                        <div className='text-detail'>
                            <Rating rating = {star}/>
                            <p>{props.totalReviewer}+ Reviewers</p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='subTotal'>
                    <h5>Subtotal</h5>
                    <p>${props.price}</p>
                </div>
                <div className='subTotal'>
                    <h5>Tax</h5>
                    <p>${props.tax}</p>
                </div>
                <form className='procode'>
                    <input  className='promo' placeholder='Apply Promo Code'></input>
                    <button className='promo' >Apply Now</button>
                </form>
                <div className='totalPrice'>
                    <div className='text'>
                        <h3>Total Price</h3>
                        <div className='text-container'>
                            <p>Overall price and includes discount</p>
                        </div>
                    </div>
                    <p>${totalPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default Summary