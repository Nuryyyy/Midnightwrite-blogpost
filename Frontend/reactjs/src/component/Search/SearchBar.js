import React,{useState, useEffect} from 'react'
import { axiosPrivate } from '../../api/axios'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import ListSearch from './ListSearch'

function SearchBar({ posts, setSearchResults}) {

    // const [searchResults, setSearchResults ] = useState([])

  const handleSubmit = (e) => e.preventDefault()

  const handleSearchChange = (e) => {
      if (!e.target.value )return setSearchResults(posts)

      const resultsArray = posts.filter(post => post.title.toLowerCase().includes(e.target.value) || post.description.toLowerCase().includes(e.target.value) || 
                                        post.category.toLowerCase().includes(e.target.value) || post.category.toUpperCase().includes(e.target.value) ||
                                        post.title.toUpperCase().includes(e.target.value) || post.description.toUpperCase().includes(e.target.value))

      setSearchResults(resultsArray)
  }

  return (
     <>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                  className="form-control me-2 col-md-1 col-2 col-1"
                  placeholder="Search" 
                  aria-label="Search" 
                  type="text"
                  id="search"
                  onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit" ><i class="fa-solid fa-magnifying-glass"></i></button>
              
          </form>
       
       {/* <SearchBar posts={posts} setSearchResults={setSearchResults} /> 
      */}
      {/* <ListSearch searchResults={searchResults} />  */}
      </>
  )

}

export default SearchBar