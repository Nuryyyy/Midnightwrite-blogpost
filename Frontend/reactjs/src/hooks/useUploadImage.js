import {useState} from 'react'
import { useAxiosPrivate } from './useAxiosPrivate';
import axios from '../api/axios';
import './useUploadImage.css'

function UseUploadImage() {

  const axiosPrivate = useAxiosPrivate()
  const [file, setFile] = useState(null);
  const PF = "http://localhost:8000/upload/"



  
  const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/upload", formData)
    
    console.log("Resdata:", res) 
    return res.data;

  } catch (err) {
    console.log(err);
  }
}

const uploadPhoto = async (e) => {
  e.preventDefault()
  const imgUrl = await upload()
  try {
    const response = await axiosPrivate.put("/profile/upload" , 
    JSON.stringify({
      image: imgUrl }), {
        withCredentials: true}) 
      window.location.reload() 
  } catch (error) {
    console.log(error)
  }

 }
  return (
            <div className='modalCenter modal-dialog '>
               <div className="modal-content">
          <div className="header modal-header">
          <h5 className="modal-title" id="Upload" >Upload Image</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-bodyrow d-flex justify-content-center align-items-center m-2">
         
                    {file 
                    ?<img src={URL.createObjectURL(file)} 
                      alt="Profile" className="profile img-fluid img-thumbnail  "/>
                    :<img src={PF + "default.jpg"}
                    alt="Profile" className="profile img-fluid img-thumbnail "/>}
                        
                <input
                style={{ display: "none" }}
                type="file"
                id="file"
                // name=""
                onChange={(e) => setFile(e.target.files[0])}
                />
                  <label className="file ms-3" htmlFor="file" >
                    Upload Image
                  </label>
                  </div>
                  <div className="modal-footer">
                  <button type="button" htmlFor="file" onClick={uploadPhoto} className="file btn btn-primary m-0">Save changes</button>
                  </div>
            </div>
           
            </div>
  )
}

export default UseUploadImage