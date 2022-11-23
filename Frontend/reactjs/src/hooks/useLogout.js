import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth, setCurrentUser, setUserID} = useAuth()


    const logout = async () =>{
        setAuth({})
        try {
            const response = await axios('/logout', {
                withCredentials: true
            })
            setCurrentUser(null)
            setUserID(null)
        } catch (error) {
            console.log(error)

        }

    }

    return logout

}

export default useLogout