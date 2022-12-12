import React from 'react';
import './landingpage.css'
import Register from './Register';
import Login from './Login';
import logo from '../images/logo_white.png'


export default function LandingPage() {
  return (
    <section id="landingpage" className="">
      <div className="container-fluid">
        <div className="row justify-content-center text-center">

        <div className="col-7 ">
       
        <img className="logo" src={logo} alt="Logo" ></img>
        <h1 className="text-title text-uppercase fw-semibold display-1 text-center text-white">Midnightwrite</h1>
        </div>
        <div className="col-5" id="content"> 
        <div className="text-center">
          <h2>What's keeping you up?</h2>
          <h4>Write it here.</h4>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Register">
            Create Account</button>
            <br></br>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Login">
            Log in</button>
        </div>
        </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="Register" tabIndex="-1" aria-labelledby="Register" aria-hidden="true">
      <div><Register /></div>
      <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal fade" id="Login" tabIndex="-1" aria-labelledby="Login" aria-hidden="true">
      <div><Login /></div>
      <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
    </section>
  


    
  )
}

