import React, { useEffect, useState } from 'react'
import TopBar from '../LayoutBar/TopBar'
import AllPost from '../Post/AllPost'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

function Home() {
  const [posts, setPosts] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getPosts  = async () => {
      
        const response = await axiosPrivate.get("/post/allpost", {withCredentials: true})
        console.log("allposts:", response.data)
        setPosts(response.data)
        
    }
    getPosts()
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

export default Home