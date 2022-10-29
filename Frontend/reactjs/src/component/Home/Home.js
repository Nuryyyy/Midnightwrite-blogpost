import React from 'react'
import Feed from './Feed'
import TopBar from '../LayoutBar/TopBar'

function Home({posts}) {
  return (
    
    <div className='home'>
      <TopBar />
      THIS IS HOMEPAGE
      {/* {[posts].length > 0 ? (
        <Feed posts={posts} />
      ):(
        <p>This is the feed</p>
      )

      } */}
   
      </div>
      )}


export default Home