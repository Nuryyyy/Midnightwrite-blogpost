import React from 'react';
import './landingpage.css'
import Register from './Register';
import Login from './Login';
//import images
import logo from '../images/logo_white.png'
export default function LandingPage() {
  return (
    <section id="landingpage" className="">
      <div className="container-fluid">
        <div className="row justify-content-center text-center">

        <div className="col-7 ">
       
        <img className="logo" src={logo} alt="Logo" ></img>
        <h1 className="text-uppercase fw-semibold display-1 text-center">Midnightwrite</h1>
        </div>
        <div class="col-5" id="content"> 
        <div className="text-center">
          <h2>What's keeping you up?</h2>
          <h4>Write it here.</h4>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Register">
            Create Account</button>
            <br></br>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Login">
            Log in</button>
        </div>
        </div>
          {/* <div id="side_content" className='col-12'>
            <h1 className="text--uppercase fw-semibold display-1">Midnightwrite</h1>
                     
          </div>
          <div>
            <button className="btn-bd-primary" type="submit">Button</button>
            <button className="btn btn-primary" type="submit">Button</button>
            </div>  */}

        </div>
      </div>

      {/* Modal */}
      <div class="modal" id="Register" tabindex="-1" aria-labelledby="Register" aria-hidden="true" >
      <div><Register /></div>
      <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" ></button>
      </div>
            {/* modal fade */}
      <div class="modal" id="Login" tabindex="-1" aria-labelledby="Login" aria-hidden="true" >
      <div><Login /></div>
      <button type="button" class="btn-close" aria-label="Close" data-backdrop="false"></button>
      

      </div>
    </section>
  


    
  )
}

