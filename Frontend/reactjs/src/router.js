import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './component/Navbar';


function App() {
  return (
          <BrowserRouter>
          <NavBar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts/create" element={<Create />} />
                <Route path="/account" element={<Account />} />
              </Routes>
          </BrowserRouter>
  );
}

export default App;
