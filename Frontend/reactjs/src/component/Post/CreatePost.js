import React, {useState} from 'react';
import Axios from 'axios'

export default function CreatePost() { 


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const Postcreate = () => {
    Axios.post('http://localhost:8000/posts/create', { withCredentials: true },
    {
        title: title, 
        description: description
    }
    ).then((response) => {
        console.log(response)
    })
    
    

  }

  return (
    <div>
        <form action='' className='createpost'>
            <label for='title'>Title</label>
            <input required type='text' nameClass='title' placeholder='title' value={title} onChange = {(e) => setTitle(e.target.value)}/>
            
            <label className='content'>Description</label>
            <textarea className='content' value={description} onChange = {(e) => setDescription(e.target.value)}></textarea>

            {/* <label for='markdown'>markdown</label>
            <textarea name='markdown' nameClass='markdown'></textarea> */}

        </form>
        <a href='/' className='btnOption btn-secondary'>Cancel</a>
        <button id="btnOption" className="click-btn" onClick={Postcreate}>Submit</button>
    </div>
  )
}
