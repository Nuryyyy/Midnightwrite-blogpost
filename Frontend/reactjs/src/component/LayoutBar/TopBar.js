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
          {/* search option */}
          {/* <form className="d-flex" role="search">
          <input className="form-control me-2 col-md-1 col-2 col-1" 
            type="text" 
            placeholder="Search" 
            aria-label="Search" 
            id="search"
            onChange={handleSearchChange}/>
          <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}

          <SearchBar posts={posts} setSearchResults={setSearchResults} />
          {/* <ListSearch searchResults={searchResults} /> */}
          {/* social media */}
          {/* <ul className="navbar-nav ml-auto">
            <div className='row'>
            <li className="nav-item col-2 col-md-1 col-1">
            <i className="fa-brands fa-facebook px-2" aria-hidden="true"></i>
            </li>
            <li className="nav-item col-2 col-md-1 col-1">
            <i className="fa-brands fa-instagram px-2" aria-hidden="true"></i>
            </li >
            <li className="nav-item col-2 col-md-1 col-1">
            <i className="fa-brands fa-twitter px-2" aria-hidden="true"></i>
            </li >
            <li className="nav-item col-2 col-md-1 col-1">
            <i className="fa-brands fa-pinterest px-2" aria-hidden="true"></i>
            </li>
            </div>
          </ul> */}
        </div>
      </div>
    </nav>
    )
}


export default TopBar