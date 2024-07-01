import './PaymentMethod.css'

import bca from '../../assets/Picture/BCA Logo 1.png'
import mandiri from '../../assets/Picture/mandiri va 1.png'
import bri from '../../assets/Picture/BRI Logo 1.png'
import bni from '../../assets/Picture/BNI Logo 1.png'
import paypal from '../../assets/Picture/PayPal.png'
import bitcoin from '../../assets/Picture/Bitcoin.png'
const PaymentMethod = () =>{
    return(
        <div className='method-wrapper'>
            <div className='text'>
                <h3>Payment Method</h3>
                <div className='text-container'>
                    <p>Please choose your payment method</p>
                    <p>Step 2 of 3</p>
                </div>
            </div>

            <form className='form-wrap'>
                <div className='input-wrapper'>
                    <div className='text-wrapper'>
                        <input type='radio' name="radAnswer"  ></input>
                        <label>BCA Virtual Account</label>
                    </div>
                    <img src={bca} ></img>
                </div>
                <div className='input-wrapper'>
                    <div className='text-wrapper'>
                        <input type='radio' name="radAnswer" ></input>
                        <label>Mandiri Virtual Account</label>
                    </div>
                    <img src={mandiri} ></img>
                </div>
                <div className='input-wrapper'>
                    <div className='text-wrapper'>
                        <input type='radio' name="radAnswer" ></input>
                        <label>BRI Virtual Account</label>
                    </div>
                    <img src={bri} ></img>
                </div>
                <div className='input-wrapper'>
                    <div className='text-wrapper'>
                        <input type='radio' name="radAnswer" ></input>
                        <label>BNI Virtual Account</label>
                    </div>
                    <img src={bni} ></img>
                </div>
                <div className='input-wrapper'>
                    <div className='text-wrapper'>
                        <input type='radio' name="radAnswer" ></input>
                        <label>PayPal</label>
                    </div>
                    <img src={paypal} ></img>
                </div>
                <div className='input-wrapper'>
                    <div className='text-wrapper'>
                        <input type='radio' name="radAnswer" ></input>
                        <label>Bitcoin</label>
                    </div>
                    <img src={bitcoin} ></img>
                </div>
            </form>
            
        </div>
    )
}

export default PaymentMethod