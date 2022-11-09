import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import TopBar from './component/LayoutBar/TopBar';
import Layout from './component/LayoutBar/Layout'
import About from './component/About/About'
import ErrorPage from './component/MissingErrorPage/ErrorPage';
import LandingPage from './component/landingpage/LandingPage'
import CreatePost from './component/Post/CreatePost'
import ViewAccount from './component/ViewAccount/ViewAccount';
import Home from './component/Home/Home'
import NewPost from './component/Post/noAuthCreatePost';
import RequireAuth from './context/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import Users from './component/ViewAccount/Users'
// import PersistLogin from './component/PersistLogin';

//add footer.js
//add error page

function App() {

  return (
    // <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      {/* <Route path='/' element={<LandingPage />}> */}

      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/posts/new" element={<NewPost />} />
      {/* <Route path="/logout" element={<} */}

       {/* <TopBar /> */}

      {/* Protected Routes */}
      {/* <Route element={PersistLogin}> */}
      {/* <Route element={<RequireAuth />}> */}
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path='/home' element={<Home />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/profile" element={<ViewAccount />} />
        

      {/* </Route> */}
      {/* </Route> */}
      
      {/* Error/missing page */}
      <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    // </BrowserRouter>


        
  );
}

export default App;