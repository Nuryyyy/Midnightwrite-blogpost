import React from 'react';

export default function CreateAccount({open, onClose}) {
    if (!open) return null
  return (
    <div>
      <div>
        <button onClick={onClose}>X</button>
      </div>
      <form action='' className='createaccount'>
                <input type='text' placeholder='username' />
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Password"/> 
                <button id="btnOption" class="click-btn" onClick="newuser()">Register</button>
        </form>
       
    </div>
  )
};
