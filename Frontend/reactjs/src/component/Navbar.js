import React from 'react';
import {NavLink} from 'react-router-dom';


export default function NavBar() {
  return (
    <div className="Navbar">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/about">About</NavLink> 
        <NavLink to="/account">View Account</NavLink>
    </div>
  )
}