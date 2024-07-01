import './Billing.css'

const Billing = () =>{


    return(
        <div className='Billing-wrapper'>
            <div className='text'>
                <h3>Billing Info</h3>
                <div className='text-container'>
                    <p className='enter'>Please enter your billing info</p>
                    <p className='step'>Step 1 of 3</p>
                </div>
            </div>
            <div className='y-container'>
                <div className='x-container'>
                    <div className='input-container'>
                        <label>Name     </label>
                        <div></div>
                        <input type='text' placeholder = 'Your Name'></input>
                    </div>
                    <div className='input-container'>
                        <label>Phone Number</label>
                        <div></div>
                        <input type='text' placeholder = 'Phone Number'></input>
                    </div>
                </div>
                <div className='x-container'>
                    <div className='input-container'>
                        <label>Address</label>
                        <div></div>
                        <input type='text' placeholder = 'Address'></input>
                    </div>
                    <div className='input-container'>
                        <label>Town/City</label>
                        <div></div>
                        <input type='text' placeholder = 'Town or City'></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing