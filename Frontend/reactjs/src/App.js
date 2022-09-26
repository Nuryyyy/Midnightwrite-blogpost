import React, {useState} from 'react';
import CreateAccount from './component/landingpage/createaccount';
import Login from './component/landingpage/login';

function App() {
  const [create, setCreate] = useState(false)
  const [login, setLogin] = useState(false)
  

  return (
    <div className="App">
      <section className='side-content'>
      <h1>What's keeping you up?</h1>
      <h2>Write it here.</h2>


      <div className='btn-option'>
        <button id='btnOption' className='click-btn'
        onClick={() => setCreate(true)}>Create Account</button>
        <button id='btnOption' className='click-btn'
        onClick={() => setLogin(true)}>Log In</button>
      </div>
      </section>
      <CreateAccount open={create} onClose={() => setCreate(false)}/>
  
      <Login open={login} onClose={() => setLogin(false)}/>

    </div>


  );
}

export default App;
