import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}/>
            {/* <Route path="/Mentors" element={<Mentors />}/>
            <Route path="/Courses" element={<Courses />}/>
            <Route path="/About" element={<About />}/> */}
            <Route path='/register' element={<Register />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
