import React from 'react'
import SinglePost from '../component/post/SinglePost'

const Feed = ({posts}) => {
  return (
    <>
    {[posts].map((post) => (
        <SinglePost key={post.id} post={post} />
    ))}
    </>
  )
}

export default Feed