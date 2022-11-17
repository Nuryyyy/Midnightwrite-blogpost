import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth, setCurrentUser} = useAuth()

    const logout = async () =>{
        setAuth({})
        try {
            const response = await axios('/logout', {
                withCredentials: true
            })
            setCurrentUser(null)
        } catch (error) {
            console.log(error)

        }

    }

    return logout

}

export default useLogout