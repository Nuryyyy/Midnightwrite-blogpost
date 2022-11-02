import React from 'react';
import { NavLink } from 'react-router-dom'
import './Topbar.css';
import logo from '../images/logo_white.png'

function TopBar() {
    return (
        <nav id="navbar" className="navbar navbar-expand-lg sticky-top" > 
         <div className="container">
          <a id="logobar" className="navbar-brand" href="/">
         <img src={logo} alt="Logo" width="40" height="40" class="d-inline-block align-text-top" />
              {/* <NavLink className="navbar-brand nav-tabs" to="/" end>MidnightWrite</NavLink> */}
          Midnightwrite
          </a>
              <button id="btn" className="navbar-toggler ms-lg-2" data-bs-toggle="collapse"
            data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
            <div class="navbar-toggler-icon"></div>
        </button>
            <div className="collapse navbar-collapse" id="nav">
                <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/landingpage">LandingPage</NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/posts/create">Create</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile/:username">Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}


export default TopBar