import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Tutor from './pages/Tutor/Tutor'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/tutor" element={<Tutor />}/>
            {/* <Route path="/About" element={<About />}/> */}
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element= {<Login />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
