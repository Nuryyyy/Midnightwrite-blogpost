import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Layout from '../src/component/Layout'
import ErrorPage from './page/ErrorPage';
import LandingPage from './page/LandingPage'
import CreatePost from './page/CreatePost'
import ViewAccount from './page/ViewAccount';
import Home from './page/Home'
import PersistLogin from './component/PersistLogin'
import UpdateAccount from './page/UpdateAccount';
import SinglePost from './page/SinglePost'
import AllPostsByUser from './page/AllPostsByUser';
import ShowComment from './component/comment/ShowComment';
import Category from './component/Category';


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