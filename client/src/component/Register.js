// import React, { useInsertionEffect } from 'react';
import React from 'react';
import {useState, useEffect, useRef, useContext } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import '../page/style/landingpage.css'
import logo from '../assets/logo_violet.png'


const register_url = '/register' 

//Requirements or validation for creating usernmame and pasword
// const user_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; //4-24char
// const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


  export default function Register() {

  const { setAuth, setCurrentUser, setUserID ,persist, setPersist } = useAuth();
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  

    //user input, error reference
  const userRef = useRef()
  const errRef = useRef();
  
  const [confirmPassword, setconfirmPassword] = useState("")
  const [firstname, setfirstname] = useState("")
  const [fnFocus, setFnFocus] = useState(false)

  const [lastname, setlastname] = useState("")
  const [lnFocus, setLnFocus] = useState(false)

  const [username, setUsername] = useState("")
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [pwFocus, setPwFocus] = useState(false)

  const [image, setImage] = useState("")

  //possible error and if success register
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  //option 2 for err
  // const [err, setErr] =  useState(null)

  //capitalize user's input for firstname, lastname and username
  const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    userRef.current.focus()
  }, [])

    const toastOptions= {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  }

    const handleValidation = () => {

      if (password !== confirmPassword) {
        toast.error("Password did not match", toastOptions
        )
        return false;

      }
      else if (password.length < 7) {
        toast.error("Password should have at least 8 characters", toastOptions)
        return false
      }
      else if (username.length < 4) {
        toast.error("Username should be greater than 5 characters", toastOptions)
        return false
      }
      else if (email === "") {
        toast.error("Email is required", toastOptions)
        return false
      }
      else if (firstname === "") {
        toast.error("Firstname is required", toastOptions)
        return false
      }
      else if (lastname === "") {
        toast.error("Lastname is required", toastOptions)
        return false
      }  
      else {
        return true
      }
    }
  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if (handleValidation()) {
      try {
        const response = await axios.post(register_url,
        JSON.stringify({
          firstname: firstname, 
          lastname: lastname, 
          username: username, 
          email: email,
          password: password,
          image : "default.jpg"
        }),
        {
          headers: {
            'Content-Type': "application/json"
          },
            withCredentials: true
        })
        const accessToken = response?.data?.accessToken 
        setAuth({username, password, accessToken})
        setCurrentUser(response.data.username)
        setUserID(response?.data?.user_id)
        setUsername('')
        setPassword('')
        setSuccess(true)
        //clear input fields

          } catch (error) {
        if (error instanceof AxiosError) {
        toast.error(error.response?.data?.msg || "Invalid credentials", toastOptions)
      } else {
        toast.error(error.message, toastOptions)
      }
    } 
    }
    



  }

  const togglePersist = () => {
    setPersist(prev => !prev)
  }
  
  useEffect(() => {
    localStorage.setItem("persist", persist)
  },[persist])

  return (
    <>
    { success ? (
      window.location.replace(`/profile/${currentUser}`)
    ) 
    : (

    <section >
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
      <form onSubmit={handleSubmit} className='createaccount'>
      <div class="md-form form-floating mb-3 ">
      {/* <i class="fas fa-user prefix grey-text"></i> */}
          <input 
          // className='form-control validate'
          placeholder='Firstname'
          className='form-control validate'
          type='text' 
          id="firstname" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(firstname)}
          onChange={(e)=>setfirstname(e.target.value)} 
          required 
          onFocus={() => setFnFocus(true)}
          onBlur={() => setFnFocus(false)}
          />
          <label htmlFor="firstname" data-error="wrong" data-success="right" >First Name:</label>
        </div>
        
        <div class="md-form form-floating mb-3">
        {/* <i class="fas fa-user prefix grey-text"></i> */}
       
          <input 
          className='form-control validate'
          placeholder='Lastname:'
          type='text' 
          id="lastname" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(lastname)}  
          onChange={(e)=>setlastname(e.target.value)}
          required 
          onFocus={() => setLnFocus(true)}
          onBlur={() => setLnFocus(false)}
          />
           <label htmlFor="lastname" data-error="wrong" data-success="right">Last Name:</label>
          </div>

        <div class="md-form form-floating mb-3">
          {/* <i class="fas fa-user prefix grey-text"></i> */}
          <input 
          className='form-control validate' 
          placeholder='Username:'
          type='text' 
          id="username" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(username)}  
          onChange={(e)=>setUsername(e.target.value)} 
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />
          <label htmlFor="username" data-error="wrong" data-success="right">Username:</label>
          </div>

          <div class="md-form form-floating mb-3">
          {/* <i class="fas fa-envelope prefix grey-text"></i> */}
         
          <input 
          className='form-control validate'
          placeholder='Email:'
          type="email"
          id="email" 
          ref={userRef} 
          autoComplete="off"  
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          />
           <label htmlFor="email" data-error="wrong" data-success="right">Email:</label>
          </div>

          <div class="md-form form-floating mb-3">
          {/* <i class="fas fa-lock prefix grey-text"></i> */}
         
          <input 
          className='form-control validate'
          placeholder='Password'
          type="password" 
          id="password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          onFocus={() => setPwFocus(true)}
          onBlur={() => setPwFocus(false)}
          /> 
           <label htmlFor="password" data-error="wrong" data-success="right">Password:</label>
          </div>
                    
          <div class="md-form form-floating mb-3">
          <input 
          className='form-control validate'
          placeholder='Confirm Password'
          type="password" 
          id="confirmPassword" 
          value={confirmPassword} 
          onChange={(e)=>setconfirmPassword(e.target.value)} 
          onFocus={() => setPwFocus(true)}
          onBlur={() => setPwFocus(false)}
          />
          <label htmlFor="confirmPassword" data-error="wrong" data-success="right">Confirm Password:</label>            
          </div>
          <div class="modal-footer justify-content-between">
          <button data-target="#register" type="submit" id="btnOption" className="btn btn-primary btn-register ">Sign Up</button>
          {errMsg && <p>{errMsg}</p>}
          </div>
                  </form>
          <ToastContainer />
        <div className='persistCheck'>
          <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
          />
          <label htmlFor="persist" className='persist'><p className="m-1">Trust this device!</p></label>
        </div>
        </div>
        </div>
        </div>
    </section>

    )}
    </>

   )
}
