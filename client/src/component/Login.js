import React, {useState, useRef, useEffect, useContext} from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthProvider';
import '../page/style/landingpage.css'
import logo from '../assets/logo_violet.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

  const login_url = '/login' 
  
  export default function Login() {
    

    const { setAuth, setCurrentUser, setUserID ,persist, setPersist } = useAuth();
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
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

  //option 2 for err
  // const [err, setErr] =  useState(null)

  const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    userRef.current.focus()
  },[])

  // useEffect(() => {
  //   setErrMsg('')
  // }, [username, password])
    
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

      if (password === "") {
          toast.error("Username and Password is required", toastOptions)
          return false
      }
      else if (username.length === "") {
          toast.error("Username and Password is required", toastOptions)
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
      const response = await axios.post(login_url,
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
        setAuth({username, password, accessToken})
        setCurrentUser(response?.data?.username)
        setUserID(response?.data?.user_id)
        setUsername('')
        setPassword('')
        setSuccess(true);
        // navigate("/home") 

        

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
    window.location.replace('/home')
    //`/profile/${currentUser}`
    
   ) 
   : (

   
     <section>
     <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>

     <div className="modal-dialog" role="document" >
        <div className="modal-content">
        <div className="modal-header text-center">
      <figure className="figure center">
        <img id="logoViolet" src={logo} alt="logo" className='rounded mx-auto d-block'></img>
        <figcaption className="figure-caption ">
        <h5 className="modal-title"  id="modal-title">Create Account</h5>
      </figcaption>
      </figure>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body mx-3">

       <form onSubmit={handleSubmit}>
       <div className="md-form form-floating mb-3 ">
          <input 
          placeholder='Username:'
          className='form-control validate'
          type="text" 
          id="username"  
          ref={userRef}
          autoComplete="off"
          onChange = {(e) => setUsername(e.target.value)}
          value={username}
          // value={capitalized(username)}
          required
          />
          <label htmlFor="username" data-error="wrong" data-success="right">Username:</label>
      </div>

      <div className="md-form form-floating mb-3">
        
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

      <div className="modal-footer justify-content-between" >
          <button data-target="#login" type="submit" id="btnOption" className="btn btn-primary btn-login">Sign In</button>
          {errMsg && <p>{errMsg}</p>}
         
        </div>
        </form>
        <div className='persistCheck'>
          <input
          type="checkbox"
          id="persist"
          onChange={togglePersist}
          checked={persist}
          />
          <label htmlFor="persist" className=''><p className="m-1">Trust this device!</p> </label>
          </div>
            {/* <a href="">Forgot password?</a> */}
      </div>
      </div>
      </div>
      
       <ToastContainer />
    </section>
    )}
    </>
    
  )
}
