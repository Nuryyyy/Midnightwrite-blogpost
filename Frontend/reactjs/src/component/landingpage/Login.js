import React, {useState} from 'react';
import Axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    Axios.post('http://localhost:8000/login',
    {
        username: username, 
        password: password
    }).then((response) => {
        console.log(response)
        console.log("success")
    })

  }
  return (
    <div>
      {/* <div>
        <button onClick={onClose}>X</button> 
      </div> */}
       <form action="">
          <input type="text" placeholder="Username"  onChange = {(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} />
          <button id="btnOption" className="click-btn" onClick={login}>Submit</button>
        </form>
            <a href="">Forgot password?</a>
    </div>
  )
}
