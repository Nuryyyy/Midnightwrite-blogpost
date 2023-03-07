import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const[isLoading, setLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch(err){
                console.log(err)
            } finally {
                isMounted && setLoading(false)
            }

        }

        !auth?.accessToken ? verifyRefreshToken() : setLoading(false)

        return() => isMounted = false
    }, [])


        return(
            <>

            {!persist
                ?<Outlet /> // if false proceed to next
               : isLoading
            ? <p>Loading</p>
            : <Outlet />
            }
            </>
        )
}

export default PersistLogin