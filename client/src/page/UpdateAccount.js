// import React, { useInsertionEffect } from 'react';
import React from 'react';
import {useState, useEffect, useRef, useContext } from 'react';
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import TopBar from "../component/navbars/TopBar"
import { AuthContext } from '../context/AuthProvider';
import logo from '../assets/logo_violet.png'

//Requirements or validation for creating usernmame and pasword
// const user_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; //4-24char
// const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function UpdateAccount() {

  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate();
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const location = useLocation()
  const userID = location.pathname.split("/")[2]
  
    //user input, error reference
  const userRef = useRef()
  const errRef = useRef();
    
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

  const [description, setDescription] = useState("")
  const [aboutFocus, setAboutFocus] = useState("")

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

  useEffect(() => {
    setErrMsg('');
}, [firstname, lastname, username, email, password, description])

useEffect(() => {
  const profile = async () => {
    const res = await axiosPrivate.get(`/profile/${currentUser}`)
    setfirstname(res.data.firstname)
    setlastname(res.data.lastname)
    setEmail(res.data.email)
    setDescription(res.data?.aboutme)
    
  }
  profile()
},[currentUser])




  const handleSubmit = async(e) => {
    e.preventDefault()
    // const dataProfile = await getProfile()
    try {
      const response = await axiosPrivate.put(`/profile/${userID}/update`,
        JSON.stringify({
          firstname: firstname, 
          lastname: lastname, 
          username: username, 
          email: email,
          password: password,
          aboutme : description
        }),
        {
          headers: {
            'Content-Type': "application/json"
          },
            withCredentials: true
        })
        setCurrentUser(response.data?.username)
        setSuccess(true)

        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
      setErrMsg(error.response.data)
    } 


  }

  const handleCancel = () => {
    // <Navigate to='/about' />
    navigate(`/profile/${currentUser}`)
   }
 


  return (
    <>
     <header><TopBar /></header>
    { success ? (
     <Navigate to={`/profile/${currentUser}`} />
     
    ) 
    : (
    <div className='container'>
    <section >
        <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>
      
      <div className="modal-dialog" role="document" >
        <div className="modal-content">
          <div className="modal-header text-center">

        <figure className="figure center">
          <img id="logoViolet" src={logo} alt="logo" className='rounded mx-auto d-block m-1'></img>
          <figcaption className="figure-caption ">
          <h3 className="modal-title align-items-center mb-3 text-black"  id="modal-title">Update Account</h3>
        </figcaption>
        </figure>
            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
          </div>

          <div className="modal-body mx-3">
          
          <form onSubmit={handleSubmit} className='createaccount'>
          <div className="md-form form-floating mb-3 ">
      {/* <i class="fas fa-user prefix grey-text"></i> */}

          
          <input 
          placeholder='Firstname'
          className='form-control validate'
          type='text' 
          id="firstname" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(firstname)}
          onChange={(e)=>setfirstname(e.target.value)} 
          // required 
          onFocus={() => setFnFocus(true)}
          onBlur={() => setFnFocus(false)}
          autoFocus={true}
          />
          <label htmlFor="firstname" data-error="wrong" data-success="right" >First Name:</label>
        </div>
        
        <div className="md-form form-floating mb-3">
       
          <input 
          className='form-control validate'
          placeholder='Lastname:'
          type='text' 
          id="lastname" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(lastname)}  
          onChange={(e)=>setlastname(e.target.value)}
          // required 
          onFocus={() => setLnFocus(true)}
          onBlur={() => setLnFocus(false)}
          />
           <label htmlFor="lastname" data-error="wrong" data-success="right">Last Name:</label>
          </div>

          <div className="form-floating mb-3">
          <textarea
          className="form-control validate" 
          style={{height : "150px"}}
          placeholder='About me:' 
          type='text' 
          id="aboutme" 
          rows="3"
          ref={userRef} 
          autoComplete="off"
          value={(description)}
          onChange={(e)=>setDescription(e.target.value)}
          onFocus={() => setAboutFocus(true)}
          onBlur={() => setAboutFocus(false)}
          />
          <label htmlFor="aboutme" classname="form-label" data-error="wrong" data-success="right">About me:</label>
          </div>

        <div className="md-form form-floating mb-3">
          {/* <i className="fas fa-user prefix grey-text"></i> */}
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

          <div className="md-form form-floating mb-3">
          {/* <i className="fas fa-envelope prefix grey-text"></i> */}
         
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

          <div className="md-form form-floating mb-3">
          {/* <i className="fas fa-lock prefix grey-text"></i> */}
         
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
          <div className="modal-footer d-flex justify-content-end"></div>
          <button type="submit" id="btnOption" className="btn btn-primary">Update</button>
          <button onClick={handleCancel} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">Cancel</button>
          {errMsg && <p>{errMsg}</p>}
        </form>
        </div>
        </div>
        </div>
    </section>
    
    </div>
    )}
    </>

  )
}
