import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../component/navbars/TopBar'
import AllPost from '../component/post/AllPost'
import { useAxiosPrivate } from '../hooks/useAxiosPrivate'
import Sidebar from '../component/navbars/Sidebar'
import './style/Home.css'
import Footer from '../component/navbars/Footer'

const AllPostsByUser = () => {

    const [posts, setPosts] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const location = useLocation()
    const username = location.pathname.split("/")[3]
    console.log(username)

    useEffect(() => {
        const getAllPost =  async () => {
            const response = await axiosPrivate.get(`/post/allpost/${username}`,
            {withCredentials: true })
            // console.log("userposts", response.data)
            setPosts(response.data)
        }

        getAllPost()
    },[])
    
    return (
        <>
         <header><TopBar /></header>
        <section className='blog container my-5'>
        <div className="row">
        <div className='post col-lg-8 col-md-8 col-12 col-xl-8 col-xxl-8' >
          <AllPost posts={posts} />
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

export default AllPostsByUser