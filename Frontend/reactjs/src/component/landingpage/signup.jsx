import React, {useState, useEffect} from 'react';

export default function SignUp({open, onClose}) {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //async 
  function Registered() {
    const info = {username, email, password}
    console.log(info)

 
   let result = fetch("/register",{
      method:'POST',
      body: JSON.stringify(info),
      headers:{
        "Content-Type":'application/json',
        "Accept": 'application/json'
      }
    })
    result = result.json()
    console.warn("result", result)


  }
  

    // let result = fetch("/register",{
    //   method:'POST',
    //   body: JSON.stringify(info),
    //   headers:{
    //     "Content-Type":'application/json',
    //     "Accept": 'application/json'
    //   }
    // })
    // result = await result.json()
    // console.warn("result", result)

  
  if (!open) return null
  return (
    <div>
      <div>
        <button onClick={onClose}>X</button>
      </div>
      <form action='' className='createaccount'>
        {/* e is event */}
          <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='username' />
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/> 
          <button id="btnOption" className="click-btn" onClick={Registered}>Sign Up</button>
        </form>
       
    </div>
  )
};
