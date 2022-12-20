
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import ListSearch from './ListSearch'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

function ResultSearch() {
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const axiosPrivate = useAxiosPrivate()


  useEffect(() => {
    const getPosts = async () => {
      const response = await axiosPrivate.get("/post/allpost",
      {withCredentials: true})
      setPosts(response?.data)
    }
    getPosts()
}, [])

  return (
    <>
    
      <SearchBar posts={posts} setSearchResults={setSearchResults} />
      <ListSearch searchResults={searchResults} />
      
    </>
    
  )
}
export default ResultSearch