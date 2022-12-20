import React, {useState, useEffect, useContext} from 'react'
import logo from '../../component/images/logo_violet.png'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

const AboutMe = () => {
    const [description, setDescription] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await axiosPrivate.put('/profile/aboutme',
            JSON.stringify({
                aboutme : description
            }),
            {
                headers: {
                  'Content-Type': "application/json"
                },
                  withCredentials: true
            })
            console.log(JSON.stringify(response?.data))
            console.log("updated description")
            // setDescription(response.data.aboutme)
            setSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    {success ? (
        window.location.reload() 
    ) : (
   
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header text-center p-1">
            <figure class="figure center">
            <img id="logoViolet" src={logo} alt="logo" className='rounded mx-auto d-block'></img>
            </figure>
            <button type="button" className="btn-close me-2" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mx-1">
            <form>
                <div className="form-group">
                <label htmlFor="description"><h3 className="modal-title mb-2"  id="modal-title">Tell us something about yourself.</h3></label>
                <textarea className="form-control" id="description" rows="3"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required />
                </div>
                <div class="modal-footer mb-0">
            <button type="submit" className="btn btn-primary btn-sm" onClick={handleSubmit}>Save</button>
            </div>
            </form>
            
            </div>
            
            
        </div>
        </div>
   
    )}
    </>
  )
}

export default AboutMe