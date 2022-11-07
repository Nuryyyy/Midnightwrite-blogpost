import React from 'react';
import {NavLink} from 'react-router-dom';


export default function NavBar() {
  return (
    <div className="Navbar">
        <NavLink to="/landingpage">CreateAccount</NavLink>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/posts/create">Create</NavLink>
        <NavLink to="/about">About</NavLink> 
        <NavLink to="/profile/:username">View Account</NavLink>
    </div>
  )
}
