import React, { useEffect, useState } from 'react'
import TopBar from '../navbars/TopBar'
import SearchBar from './SearchBar'
import ListSearch from './ListSearch'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import Sidebar from '../navbars/Sidebar'
import '../../page/style/Home.css'
import Footer from '../navbars/Footer'

const ResultPage = () => {

    const [posts, setPosts] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getPosts  = async () => {
          
            const response = await axiosPrivate.get("/post/allpost", {withCredentials: true})
            // console.log("allposts:", response.data)
            setPosts(response?.data)
            setSearchResults(response?.data)
            
        }
        getPosts()
    },[])

    return (
        <>
         <header><TopBar /></header>
        <section className='blog container my-5'>
        <div className="row">
        <div className='post col-lg-8 col-md-8 col-12 col-xl-8 col-xxl-8' >
           <SearchBar posts={posts} setSearchResults={setSearchResults} />
            <ListSearch searchResults={searchResults} />
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

export default ResultPage