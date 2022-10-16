import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './component/Navbar';
import LandingPage from './component/landingpage/LandingPage'
import CreatePost from './component/Post/CreatePost'
import ViewAccount from './component/ViewAccount/ViewAccount';


function App() {
  return (
          <BrowserRouter>
          <NavBar />
              <Routes>
                <Route path="/home" element={<LandingPage />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/profile/:username" element={<ViewAccount />} />
                {/* <Route path="/about" element={<About />} />
                <Route path="*" element={<ErrorPage />} /> */}
              </Routes>
          </BrowserRouter>
  );
}

export default App;