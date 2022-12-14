import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Layout from './component/LayoutBar/Layout'
import About from './component/About/About'
import ErrorPage from './component/MissingErrorPage/ErrorPage';
import LandingPage from './component/landingpage/LandingPage'
import CreatePost from './component/Post/CreatePost'
import ViewAccount from './component/ViewAccount/ViewAccount';
import Home from './component/Home/Home'
import PersistLogin from './component/PersistLogin/PersistLogin';
import UpdateAccount from './component/ViewAccount/UpdateAccount';
import SinglePost from './component/Post/SinglePost'
import AllPostsByUser from './component/Post/AllPostsByUser';
import ShowComment from './component/Comment/ShowComment';

import Write from './component/Post/CreatePost_v2';
import Category from './component/Category/Category';

//add footer.js

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/midnightwrite" element={<LandingPage />} />
    
      
      <Route element={<PersistLogin />}>
      {/* <Route path="/about" element={<About />} /> */}
      <Route path='/home' element={<Home />} />
      {/* <Route path="/posts/create" element={<CreatePost />} /> */}
      <Route path="/profile/:username" element={<ViewAccount />} />
      <Route path="/profile/:user_id/update" element={<UpdateAccount />} />
      <Route path="/post/:post_id" element={<SinglePost />} />
      <Route path="/post/allpost/:username" element={<AllPostsByUser />} />
      <Route path="/comment/:postid" element={<ShowComment />} />
      <Route path="/posts/create" element={<CreatePost/>} />

      <Route path="/post/allpost" element={<Category />} />
      </Route>
      
      {/* Error/missing page */}
      
      <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
    </BrowserRouter>


        
  );
}

export default App;