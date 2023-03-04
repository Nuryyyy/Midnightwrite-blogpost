import React from 'react'
import logo from '../images/logo_violet.png'

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start">
    
    <div className="container p-4">
     
      <div className="row">
        
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h3 className="text-uppercase">ABOUT US</h3>
  
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae
            aliquam voluptatem veniam, est atque cumque eum delectus sint!
          </p>
        </div>
        
  
       
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h3 className="text-uppercase">WRITE TO US</h3>
  
          <ul className="fa-ul" >
            <li className="mb-3">
              <span className="fa-li"><i className="fas fa-home"></i></span><span className="ms-2">Phillipines</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><i className="fas fa-envelope"></i></span><span className="ms-2">info@midnightwrite.com</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><i className="fas fa-phone"></i></span><span className="ms-2">+ 01 234 567 88</span>
            </li>
            <li className="mb-3">
              <span className="fa-li"><i className="fas fa-print"></i></span><span className="ms-2">+ 01 234 567 89</span>
            </li>
          </ul>
        </div>
       
      </div>
     
    </div>
    
  
   
    <div className="text-center p-3" >
      © 2022 Copyright:
      <a className="text-dark" href="http://localhost:3000/midnightwrite">midnightwrite.com</a>
    </div>
   
  </footer>
  
  )
}

export default Footer