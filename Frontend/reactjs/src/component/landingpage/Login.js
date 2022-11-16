import React, {useState, useRef, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import axios from '../../api/axios';

import './landingpage.css'
import logo from '../images/logo_violet.png'

export default function Login() {

const { setAuth, setCurrentUser } = useAuth();
const navigate = useNavigate()
// const location =  useLocation()
// const from = location.state?.from?.pathname || "/"

const userRef = useRef()
const errRef = useRef()

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [errMsg, setErrMsg] = useState("")
const [success, setSuccess] = useState(false) 

  //option 2 for err
const [err, setErr] =  useState(null)

const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

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
      // await login(username, password)
      const response = await axios.post("/login",
        JSON.stringify({
          username, 
          password
        }),
        {
          headers: {
            'Content-Type': "application/json"},
            withCredentials: true
          
        })
        
        console.log(JSON.stringify(response?.data))
        const accessToken = response?.data?.accessToken 
        console.log("data.AccessToken:", accessToken)
        setAuth({username, password, accessToken})
        setCurrentUser(response.data?.username)
        setUsername('')
        setPassword('')
        setSuccess(true)
        navigate("/profile") 
        

    } catch (err) {
      if (!err?.response) {
          // setErrMsg('No Server Response');
          setErr('No Server Response');
      } else if (err.response?.status === 401) {
          // setErrMsg('Username Taken');
          setErr('Wrong password or username');
      } else {
          // setErrMsg('Registration Failed')
          setErr('Login Failed')
      }
      errRef.current.focus();
  }
    

  }
 


  return (
    
     <section>
     <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>

     <div className="modal-dialog" role="document" >
        <div className="modal-content" >
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
          value={capitalized(username)}
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

      <div class="modal-footer d-flex justify-content-end" ></div>
          <button data-target="#login" type="submit" id="btnOption" className="btn btn-primary">Sign In</button>
          {err && <p>{err}</p>}
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