import Post from "../post/Post";
import React from 'react'


const ListSearch = ({searchResults, posts}) => {
    // const result = searchResults.map(post => <Post key={post.post_id} post={post} />)
    // const content = result?.length ? result : <article><p>No Matching Posts</p></article>
  return (
    <div className='row'>
      {searchResults ? (
        searchResults
        .sort((a,b) => a.datepost < b.datepost ? 1 : -1)
        .map((post ,i) => 
     (  
      <div className="post1 col-lg-6 col-md-6 col-12 col-xl-6 pb-4 " key={i}>
        <Post key={post.post_id} post={post} />
        </div>
      ))) :(<article><p>No Matching Posts</p></article>
              )
      }
      
    </div>
  )
}

export default ListSearch