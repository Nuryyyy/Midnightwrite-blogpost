import React from 'react'

export default function 
() {
  return (
    <div>
        <form action='' className='createpost'>
            <label for='title'>Title</label>
            <input required type='text' nameClass='title' placeholder='title' />
            
            <label for='content'>Description</label>
            <textarea name='content' nameClass='content'></textarea>

            {/* <label for='markdown'>markdown</label>
            <textarea name='markdown' nameClass='markdown'></textarea> */}

        </form>
        <a href='/' className='btnOption btn-secondary'>Cancel</a>
        <button id="btnOption" className="click-btn" onClick={x}>Submit</button>
    </div>
  )
}
