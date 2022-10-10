import React from 'react';
import Register from './Register';
import Login from './Login';

export default function LandingPage() {
  return (
    <div className="App">
        <section className='side-content'>
        <h1>What's keeping you up?</h1>
        <h2>Write it here.</h2>
      </section>
        <Register />
        <Login />
    </div>
  )
}
