import React from 'react'

export default function Login({open, onClose}) {
  if (!open) return null 
  return (
    <div>
      <div>
        <button onClick={onClose}>X</button> 
      </div>
       <form action="">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button id="btnOption" class="click-btn" onclick="newuser()">Submit</button>
        </form>
            <a href="">Forgot password?</a>
    </div>
  )
}
