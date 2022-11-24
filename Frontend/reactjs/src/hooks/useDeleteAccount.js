import { useAxiosPrivate } from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';


// export default function useDeleteAccount() {
//     const {setAuth, setCurrentUser, setUserID} = useAuth()
//     const location = useLocation()
//     const userID = location.pathname.split("/")[2]
//     console.log("deleteID:", userID)
    
//     const deleteAccount = async () =>{
//         setAuth({})
//         try {
//             const response = await axios.delete(`/${userID}/delete`, {
//                 withCredentials: true
//             })
//             setCurrentUser(null)
//             setUserID(null)
//         } catch (error) {
//             console.log(error)

//         }
  
//     }

//     return deleteAccount
// }


const useDeleteAccount = () => {

    const {setAuth, setCurrentUser, setUserID} = useAuth()
    const axiosPrivate = useAxiosPrivate();
    // const userID = location.pathname.split("/")[2]
    // console.log("deleteID:", userID)

    const { userID } = useContext(AuthContext)
    console.log("deleteID:", userID)
    const deleteAccount = async () =>{

    setAuth({})
    try {
        
        const response = await axiosPrivate.delete(`/profile/${userID}/delete`, {
            withCredentials: true
        })
        setCurrentUser(null)
        setUserID(null)
    } catch (error) {
        console.log(error)

    }

}

return deleteAccount

}

export default useDeleteAccount