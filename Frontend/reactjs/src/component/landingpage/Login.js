// import React, {useState, useRef, useEffect, useContext} from 'react';
import React, {useState, useRef, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthProvider';
// import useAuth from '../../hooks/useAuth'
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

import './landingpage.css'
import logo from '../images/logo_violet.png'

  const login_url = '/login' 
  
  export default function Login() {

  const {setAuth} = useContext(AuthContext)
  // const {setAuth} = useAuth()
  const navigate = useNavigate()
  // const location =  useLocation()
  // const from = location.state.from.pathname || "/"
  // const from = location.state?.from?.pathname || "/"
  // const from = (location.state && location.state.from && location.state.from.pathname) || "/"

  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)



  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])


  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("handlesumbit")
    
    try {
      const response = await axios.post(login_url,
        JSON.stringify({
          username, 
          password
        }),
        {
          headers: {
            'Content-Type': "application/json"},
            // "Access-Control-Allow-Headers":"Authorization",
            withCredentials: true
          
        })
        console.log("in function response")
        console.log(JSON.stringify(response?.data))
        setUsername('')
        setPassword('')
        const Token = response?.data?.token 
        // console.log("fe:", Token)
        //response?.data?.Token //response.data &&
        setAuth({username, password, Token})
        setSuccess(true)
        navigate("/posts/create")
        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
    } 

  }

  
  return (
    
    // <>
    // {success ?  (
    //   <div>
    //     <h1> success login!</h1>
        
    //     {/* <p>
    //       <a href="/posts/create">Log In</a>
    //     </p> */}
    //   <Link to="/posts/create" />
    //    {/* <redirect to="/somewhere/else" /> */}

    //   </div>
    // ) : (
    
     <section>
     <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>

     <div className="modal-dialog" role="document" >
        <div className="modal-content">
        <div className="modal-header text-center">
      <figure class="figure center">
        <img id="logoViolet" src={logo} alt="logo" class='rounded mx-auto d-block'></img>
        <figcaption class="figure-caption ">
        <h5 class="modal-title"  id="modal-title">Create Account</h5>
      </figcaption>
      </figure>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body mx-3">

       <form onSubmit={handleSubmit}>
       <div class="md-form form-floating mb-3 ">
          <input 
          placeholder='Username:'
          className='form-control validate'
          type="text" 
          id="username"  
          ref={userRef}
          autoComplete="off"
          onChange = {(e) => setUsername(e.target.value)}
          value={username}
          required
          />
          <label htmlFor="username" data-error="wrong" data-success="right">Username:</label>
      </div>

      <div class="md-form form-floating mb-3">
        
        <input 
          placeholder='Password:'
          className='form-control validate'
          type="password" 
          id="password" 
          autoComplete="off"
          onChange = {(e) => setPassword(e.target.value)}
          value={password}
          required
          />
          <label htmlFor="password" data-error="wrong" data-success="right">Password:</label>
      </div>

      <div class="modal-footer d-flex justify-content-end"></div>
          <button data-target="#exampleModal"type="submit" id="btnOption" className="btn btn-primary">Sign In</button>
        </form>
            <a href="">Forgot password?</a>
      </div>
      </div>
      </div>
      
    </section>
    
    // )} 
    // </>
  )
}
