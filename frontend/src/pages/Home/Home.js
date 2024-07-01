import { Link } from 'react-router-dom'

import './Home.css'

import picture from '../../assets/Picture/home-page-picture-cropped.jpg' 

const Home = () => {
    return (
        <div className="home">
            <div className="home-pic-title-container">
                <div className="home-picture-container">
                    <img src={picture} alt="" />
                </div>
                <div className="home-title-container">
                    <h1>Find Your Tutor Here</h1>
                    <h3>100+ Experienced Tutor Here</h3>
                    <p>Personalized tutoring that fits your unique learning needs</p>
                    <p>We connect you with top-tiers tutors</p>

                    <div className="home-title-button-container">
                        <Link to='/register'><button className='home-btn-1'>Get Started</button></Link>
                        <Link to='/register'><button className='home-btn-2'>Explore</button></Link>
                    </div>
                </div>
            </div> 
            <div className="home-box-decor-container">
                <div className="left-green"></div>
                <div className="left-blue"></div>

                <div className="right-green"></div>
                <div className="right-yellow"></div>
                <div className="right-blue"></div>
            </div>           
        </div>
    )
}

export default Home;