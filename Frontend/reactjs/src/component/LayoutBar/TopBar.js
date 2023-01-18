import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom'
// import './Topbar.css';
import logo from '../images/logo_white.png'
import { AuthContext } from '../../context/AuthProvider';
import SearchBar from '../Search/SearchBar';
import ListSearch from '../Search/ListSearch';

function TopBar({posts, setSearchResults, searchResults}) {
    const { currentUser } = useContext(AuthContext)
    // const [searchResults, setSearchResults] = useState([])

    // console.log("navbar:", currentUser)
    return (
        <nav id="navbar" className="navbar navbar-expand-lg mb-5" > 
         <div className="container">
          <a id="logobar" className="navbar-brand" href="/home">
         <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
          Midnightwrite
          </a>
              <button id="btn" className="navbar-toggler ml-auto" type='button' data-bs-toggle="collapse"
            data-bs-target="#nav" aria-controls="nav"  aria-expanded="false" aria-label="Expand Navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav me-auto mb-2 col-md-1 col-2 col-1 mb-lg-0">
            <li className="nav-item ">
              <NavLink className="nav-link " aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts/create">Write</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/profile/${currentUser}`}>Profile</NavLink>
            </li>
          </ul>
         
          <SearchBar posts={posts} setSearchResults={setSearchResults} />

        </div>
      </div>
    </nav>
    )
}


export default TopBar