import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../LayoutBar/TopBar'
import AllPost from '../Post/AllPost'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

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
        <TopBar/>
        <div className='Home'>
          <AllPost posts={posts} />
        </div>
        </>
      )
    }

export default AllPostsByUser