import React from 'react';
import {useState, useEffect } from 'react';
import Axios from 'axios';

export default function Register() {
    //user input, error reference
    
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const Register = () => {
    Axios.post('http://localhost:8000/register', 
    {
        firstname: firstname, 
        lastname: lastname, 
        username: username, 
        email: email,
        password: password
    }).then((response) => {
        console.log(response)
    })
}

  return (
    <div>
        {/* <div>
        <button onClick={onClose}>X</button>
      </div> */}
      <form action='' className='createaccount'>
        {/* e is event */}
          <input type='text' value={firstname} onChange={(e)=>setfirstname(e.target.value)} placeholder='First Name' />
          <input type='text' value={lastname} onChange={(e)=>setlastname(e.target.value)} placeholder='Last Name' />
          <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/> 
          <button id="btnOption" className="click-btn" onClick={Register}>Sign Up</button>
        </form>
       
    </div>
  )
}
