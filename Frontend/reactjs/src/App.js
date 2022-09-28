import React, {useState} from 'react';
import SignUp from './component/landingpage/signup';
import SignIn from './component/landingpage/signin';

function App() {
  const [signup, setSignup] = useState(false)
  const [signin, setSignin] = useState(false)
  

  return (
    <div className="App">
      <section className='side-content'>
      <h1>What's keeping you up?</h1>
      <h2>Write it here.</h2>


      <div className='btn-option'>
        <button id='btnOption' className='click-btn'
        onClick={() => setSignup(true)}>Sign Up</button>
        <button id='btnOption' className='click-btn'
        onClick={() => setSignin(true)}>Sign In</button>
      </div>
      </section>
      <SignUp open={signup} onClose={() => setSignup(false)}/>
      {/* <SignUp open={signup}/> */}
  
      <SignIn open={signin} onClose={() => setSignin(false)}/>
      {/* <SignIn open={signin}/> */}

    </div>


  );
}

export default App;
