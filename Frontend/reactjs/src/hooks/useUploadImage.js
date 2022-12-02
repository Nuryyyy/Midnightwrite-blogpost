import {useState} from 'react'
import { useAxiosPrivate } from './useAxiosPrivate';


function useUploadImage() {

  const axiosPrivate = useAxiosPrivate()
  const [file, setFile] = useState(null);
  const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axiosPrivate.put("/profile/upload", formData, {
      withCredentials: true
    })
    setFile(null)
    console.log("Resdata:", res.data) 
    return res.data;

  } catch (err) {
    console.log(err);
  }
}
  return upload
}

export default useUploadImage