import React from 'react'
import Post from './Post'

function AllPost({posts}) {
  // const 
  return (
    <div className='allpost'>
      {posts && posts
      .sort((a,b) => a.datepost < b.datepost ? 1 : -1)
      .map((p ,i) => (
        <Post post={p} key={i}/>
      ))}
    </div>
  )
}

export default AllPost