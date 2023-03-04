import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// import TopBar from '../LayoutBar/TopBar'
// import AllPost from '../Post/AllPost'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import './Posts.css'

const SeeAllPost = ({username}) => {
    const [image, setImages] = useState([])
    const [posts, setPosts] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const PF = "http://localhost:8000/upload/";

    useEffect(() => {
        const getAllPost =  async () => {
            const response = await axiosPrivate.get(`/post/allpost/${username}`,
            {withCredentials: true })
            // console.log("userposts", response.data)
            setPosts(response.data)
        }

        getAllPost()
    },[username])


    
    return (
    
      
      <section className='featured container my-5'>
       <div className="row" >
     
              {posts && posts
              .sort((a,b) => a.datepost < b.datepost ? 1 : -1).slice(0,4)
              .map((post, i) =>
              (
                
                <div className='one col-lg-6 col-md-6 col-12 mb-5' key={i}>
                        <img src={PF + post.image}  alt="1" className="img-fluid fimage" />
                        <div className='text w-90 h-50 text-light p-4'>
                          <p>{new Date(post.datepost).toDateString()}</p>
                          <h4>{post.title}</h4>
                          <a href={`/post/${post.post_id}`}>Read more</a>
                        </div>
                     
                </div>
              ))
              }
          
         </div>
      </section>
  
    )
}

export default SeeAllPost