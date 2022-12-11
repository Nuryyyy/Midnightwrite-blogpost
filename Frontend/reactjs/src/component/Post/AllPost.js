import React from 'react'
import Post from './Post'
import './Posts.css'

function AllPost({posts}) {
  // const 
  return (
   
  <div className='row'>
      {posts && posts
      .sort((a,b) => a.datepost < b.datepost ? 1 : -1)
      .map((p ,i) => 
     (  
      <div className="post1 col-lg-6 col-md-6 col-12 col-xl-6 pb-4 " key={i}>
        <Post post={p} key={i}/>
        </div>
      ))
      }
      
    </div>
    
   
  )
}

export default AllPost