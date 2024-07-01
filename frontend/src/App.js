import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Tutor from './pages/Tutor/Tutor';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Payment from './pages/Payment/Payment';
import CompleteProfile_Tutor from './pages/Register/CompleteProfile_Tutor/CompleteProfile_Tutor';
import TutorDetails from './pages/TutorDetails/TutorDetails';
import StudentProfile from './pages/StudentProfile/StudentProfile';
import Profile from './pages/Profile/Profile';
import ReviewTutor from './pages/ReviewTutor/ReviewTutor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/tutor" element={<Tutor />}/>
            <Route path="/payment/:id" element={<Payment />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/tutor/:id' element={<TutorDetails/>}/>
            <Route path='/CompleteProfile_Tutor' element= {<CompleteProfile_Tutor />}/>
            <Route path='/login' element= {<Login />} />
            <Route path='/profile' element= {<Profile />}/>
            <Route path='/StudentProfile' element= {<StudentProfile />} />
            <Route path='/review_tutor/:id' element={ <ReviewTutor /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
