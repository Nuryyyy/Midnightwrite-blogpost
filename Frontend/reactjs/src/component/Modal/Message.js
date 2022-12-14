import React from 'react'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useState, useEffect, useRef, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import emailjs from '@emailjs/browser';

const Message = ({sendToUser, username}) => {
  const axiosPrivate = useAxiosPrivate()
  const form =useRef()
  const [senderEmail, setSenderEmail] = useState("")
  const { currentUser } = useContext(AuthContext)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ynsm2vq', 'template_l74itzo', form.current, 'TjEK3zcIxorIRG_VO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);

      });
      e.target.reset()
  };

  useEffect(() => {
    const profile = async () => {
      const res = await axiosPrivate.get(`/profile/${currentUser}`)
      setSenderEmail(res.data.email)
    }
    profile()
  },[currentUser])
  
  return (
    <section>
        {/* <div className="modal fade" id="message" tabIndex="-1" role="dialog" aria-labelledby="message"
    aria-hidden="true"> */}
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">Send message to {username}</h4>
          <button type="button" className="btn-close me-2" data-bs-dismiss="modal" aria-label="Close"></button>
          
        </div>
        <form ref={form} onSubmit={sendEmail}>

        <div className="modal-body mx-3">
        <div className="md-form form-floating mb-3">
            {/* <i className="fa fa-user prefix grey-text"></i> */}
            <input 
            type="text" 
            name="sendToUser" required
            className="form-control validate"
            value={sendToUser}
            disabled={true}
            />
            <label data-error="wrong" data-success="right" htmlFor="username">Send to</label>
          </div>
  
          <div className="md-form form-floating mb-3">
            {/* <i className="fa fa-user prefix grey-text"></i> */}
            <input 
            placeholder='Your name:'
            type="text" 
            name="username" required
            className="form-control validate" />
            <label data-error="wrong" data-success="right" htmlFor="username">Your name</label>
          </div>
  
          <div className="md-form form-floating mb-3">
            {/* <i className="fa fa-envelope prefix grey-text"></i> */}
            <input 
            type="email" 
            name="userEmail" required
            className="form-control validate" 
            value={senderEmail}
            disabled={true}/>
            <label data-error="wrong" data-success="right" htmlFor="userEmail">Your email</label>
          </div>
  
          <div className="md-form form-floating mb-3">
            {/* <i className="fa fa-tag prefix grey-text"></i> */}
            <input 
            placeholder='Subject'
            type="text" 
            name="subject" required
            className="form-control validate" />
            <label data-error="wrong" data-success="right" htmlFor="userSubject">Subject</label>
          </div>
  
          <div className="form-floating mb-3">
            {/* <i className="fa fa-pencil prefix grey-text"></i> */}
            <textarea 
            placeholder='Write your message'
            style={{height : "150px"}}
            type="text" 
            name="message" 
            className="form-control validate" rows="4"></textarea>
            <label data-error="wrong" data-success="right" htmlFor="userMessage">Your message</label>
          </div>
  
        </div>
       
        <div className="modal-footer d-flex justify-content-center">
          <button className="btn btn-unique">Send <i className="fa fa-paper-plane-o ml-1"></i></button>
        </div>
        </form>
      </div>
    </div>
  {/* </div> */}
  
  {/* <div className="text-center">
    <a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalContactForm">Launch
      Modal Contact Form</a>
  </div> */}
    </section>
  )
}

export default Message