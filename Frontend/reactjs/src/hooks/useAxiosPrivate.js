import React, {useEffect} from "react";
import axios, { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () =>{
    const{ user } = useAuth

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.token}`
                }
                return config
            }, (error) => Promise.reject(error)

        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true 
                    // const newToken = await refresh()
                    // const token = await auth()
                    prevRequest.headers['Authorization'] = `Bearer ${user?.token}`;
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
            
    },[user])

    return axiosPrivate
}

export {useAxiosPrivate}