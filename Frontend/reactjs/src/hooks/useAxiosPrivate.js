//this section made use to call the newAccessToken from the server side
import {useEffect} from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from './useRefreshToken.js'

const useAxiosPrivate = () =>{
    const refresh = useRefreshToken
    const{ auth } = useAuth()

    useEffect(() => {

        //interceptor is like eventlistener
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)

        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
                response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) { //forbidden
                    prevRequest.sent = true 
                    const newAccessToken = refresh()
                    // const token = await auth()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error) 
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept); 
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
            
    },[auth, refresh])

    return axiosPrivate
}

export {useAxiosPrivate}