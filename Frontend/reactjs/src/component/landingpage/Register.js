// import React, { useInsertionEffect } from 'react';
import React from 'react';
import {useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';

import { Link } from 'react-router-dom';

const register_url = '/register' 

export default function Register() {
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

  //possible error and if success register
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  // useInsertionEffect(() => {
  //   setErrMsg('')
  // })

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("handlesumbit")

    try {
      const response = await axios.post(register_url,
        JSON.stringify({
          firstname: firstname, 
          lastname: lastname, 
          username: username, 
          email: email,
          password: password
        }),
        {
          headers: {
            'Content-Type': "application/json",
            withCredentials: true
          },
          
        })
        console.log("in function response")
        console.log(response.data)
        console.log(response.token)
        setSuccess(true)
        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
    } 


  }


  return (

    <>
    {success ? (
      <div>
        <h1> Registered!</h1>
        <p>
          <a href="#">Log In</a>
        </p>
      </div>
    ) : (
    <section>
        <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>

      <form onSubmit={handleSubmit} className='createaccount'>
        <label htmlFor="firstname">First Name:</label>
          <input 
          type='text' 
          id="firstname" 
          ref={userRef} 
          autoComplete="off" 
          value={firstname} 
          onChange={(e)=>setfirstname(e.target.value)} 
          required 
          onFocus={() => setFnFocus(true)}
          onBlur={() => setFnFocus(false)}
          />

        <br></br>
        <label htmlFor="lastname">Last Name:</label>
          <input 
          type='text' 
          id="lastname" 
          ref={userRef} 
          autoComplete="off" 
          value={lastname} 
          onChange={(e)=>setlastname(e.target.value)}
          required 
          onFocus={() => setLnFocus(true)}
          onBlur={() => setLnFocus(false)}
          />

        <br></br>
        <label htmlFor="username">Username:</label>
          <input 
          type='text' 
          id="username" 
          ref={userRef} 
          autoComplete="off" 
          value={username} 
          onChange={(e)=>setUsername(e.target.value)} 
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />

          <br></br>
          <label htmlFor="email">Email:</label>
          <input 
          type="text"
          id="email" 
          ref={userRef} 
          autoComplete="off"  
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />

          <br></br>
          <label htmlFor="password">Password:</label>
          <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          onFocus={() => setPwFocus(true)}
          onBlur={() => setPwFocus(false)}
          /> 

          <button type="submit" id="btnOption" className="click-btn">Sign Up</button>
        </form>
       
    </section>
    )}
    </>
  )
}
