import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './component/Navbar';
import LandingPage from './component/landingpage/LandingPage'
import CreatePost from './component/Post/CreatePost'


function App() {
  return (
          <BrowserRouter>
          <NavBar />
              <Routes>
                <Route path="/home" element={<LandingPage />} />
                <Route path="/posts/create" element={<CreatePost />} />
                {/* <Route path="/about" element={<About />} />
                
                <Route path="/account" element={<Account />} /> */}
              </Routes>
          </BrowserRouter>
  );
}

export default App;