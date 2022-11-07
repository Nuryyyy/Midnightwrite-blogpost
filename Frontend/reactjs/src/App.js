import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
// import NavBar from './component/NavigationBar/Navbar';
import TopBar from './component/LayoutBar/TopBar';
import Layout from './component/LayoutBar/Layout'
import About from './component/About/About'
import ErrorPage from './component/MissingErrorPage/ErrorPage';
import LandingPage from './component/landingpage/LandingPage'
import CreatePost from './component/Post/CreatePost'
import ViewAccount from './component/ViewAccount/ViewAccount';
import Home from './component/Home/Home'
import RequireAuth from './context/RequireAuth';
import { AuthProvider } from './context/AuthProvider';


//add footer.js
//add error page

function App() {

  return (
    <BrowserRouter>
   
    <Routes>
      <Route path='/' element={<Layout />}>
      {/* <Route path='/' element={<LandingPage />}> */}
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landingpage" element={<LandingPage />} />
    

       {/* <TopBar /> */}

      {/* Protected Routes */}
      {/* <Route element={<RequireAuth />}> */}
      <Route path="/about" element={<About />} />
      <Route path='/home' element={<Home />} />
      <Route path="/posts/create" element={<CreatePost />} />
      <Route path="/profile/:username" element={<ViewAccount />} />
      {/* </Route> */}
      
      {/* Error/missing page */}
      
      <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    </BrowserRouter>


        
  );
}

export default App;