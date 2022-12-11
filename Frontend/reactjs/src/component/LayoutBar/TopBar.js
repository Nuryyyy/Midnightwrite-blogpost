import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom'
// import './Topbar.css';
import logo from '../images/logo_white.png'
import { AuthContext } from '../../context/AuthProvider';

function TopBar() {
    const { currentUser } = useContext(AuthContext)
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
            <ul class="navbar-nav me-auto mb-2 col-md-1 col-2 col-1 mb-lg-0">
            <li className="nav-item ">
              <NavLink className="nav-link " aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts/create">Create</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/profile/${currentUser}`}>Profile</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/profile">{currentUser?.username}</NavLink> 
            </li> */}
          </ul>
          {/* search option */}
          {/* <form class="d-flex" role="search">
          <input class="form-control me-2 col-md-1 col-2 col-1" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}

          {/* social media */}
          <ul className="navbar-nav ml-auto">
            <div className='row'>
            <li className="nav-item col-2 col-md-1 col-1">
            <i class="fa-brands fa-facebook px-2" aria-hidden="true"></i>
            </li>
            <li className="nav-item col-2 col-md-1 col-1">
            <i class="fa-brands fa-instagram px-2" aria-hidden="true"></i>
            </li >
            <li className="nav-item col-2 col-md-1 col-1">
            <i class="fa-brands fa-twitter px-2" aria-hidden="true"></i>
            </li >
            <li className="nav-item col-2 col-md-1 col-1">
            <i class="fa-brands fa-pinterest px-2" aria-hidden="true"></i>
            </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    )
}


export default TopBar