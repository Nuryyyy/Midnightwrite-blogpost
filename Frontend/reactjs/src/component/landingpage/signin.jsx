import React, {useState} from 'react'

//{open, onClose}
export default function SignIn({open, onClose}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

async function loggedin() {
  console.log(username, password)
  let info={username, password}
  let result = await fetch("/login",{
    method: 'POST',
    headers: {
      "Content-Type":'application/json',
      "Accept": 'application/json'
    },
    body:JSON.stringify(info)

  })
  result = await result.json();
}

if (!open) return null 

  return (
    <div>
      <div>
        <button onClick={onClose}>X</button> 
      </div>
       <form action="">
          <input type="text" placeholder="Username"  onChange = {(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} />
          <button id="btnOption" className="click-btn" onClick={loggedin}>Submit</button>
        </form>
            <a href="">Forgot password?</a>
    </div>
  )
}
