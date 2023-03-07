import React, { useEffect, useState } from 'react'
import TopBar from '../component/navbars/TopBar'
import Sidebar from '../component/navbars/Sidebar'
import Footer from '../component/navbars/Footer'
import { useAxiosPrivate } from '../hooks/useAxiosPrivate'
import './style/Home.css'
import ListSearch from '../component/search/ListSearch'
import { useLocation } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const axiosPrivate = useAxiosPrivate()

  const location = useLocation()
  useEffect(() => {
    const getPosts  = async () => {
      
        const response = await axiosPrivate.get("/post/allpost", {withCredentials: true})
        setPosts(response?.data)
        setSearchResults(response?.data)
    }
    getPosts()
  },[])
  return (
    <>
    <header>
      <div className="intro">
      <img className='headpic img-fluid w-100' src='https://images.unsplash.com/photo-1536173840528-d433ffcbb578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt="blog"/>
      <div className='head text-center'>
        <h1>Midnightwrite</h1>
        <h6>What's keeping you up?</h6>
        <p>Write it here.</p>
        <hr className='w-25 mx-auto'></hr>
      </div>
      </div>
      <TopBar posts={posts} setSearchResults={setSearchResults}/>
    </header>
    <div>

    </div>
    <section className='blog container my-5'>
      <div className="row">
      <div className='post col-lg-8 col-md-8 col-12 col-xl-8 col-xxl-8' >

      {/* <AllPost posts={posts} /> */}
      <ListSearch searchResults={searchResults} posts={posts}  />
        </div>
      <div className='sidebar col-lg-4 col-md-4 col-12 col-xl-4 col-xxl-4'>
      <Sidebar />
      </div>
      </div>

    </section>
    <section className='footer'>
    <Footer />
    </section>
    </>
  )
}

export default Home