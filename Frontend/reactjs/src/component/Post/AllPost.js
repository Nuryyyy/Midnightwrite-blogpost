import React from 'react'
import Post from './Post'

function AllPost({posts}) {
  // const 
  return (
    <div className='allpost'>
      {posts.map((p ,i) => (
       
        <Post post={p} key={i}/>
      ))}
    </div>
  )
}

export default AllPost