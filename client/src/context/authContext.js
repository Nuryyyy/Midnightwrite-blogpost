//https://youtu.be/0aPLk2e2Z3g?t=5265 - Lama Dev tutorial

import axios from "../api/axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => { //components
    const [currentUser, setCurrentUser] =  useState(JSON.parse(localStorage.getItem("user") || null))

    const login = async(username, password) => {
    const response = await axios.post("/login",
        JSON.stringify({
          username, 
          password
        }),
        {
          headers: {
            'Content-Type': "application/json"},
            withCredentials: true
          
        })
        setCurrentUser(response.data)
    }
    // const login =  async(inputs) => {
    //     const response = await axios.post("/login", inputs)
    //     setCurrentUser(response.data)
    // }
    // const logout = async (inputs)

    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser, login}}>
        {children}
    </AuthContext.Provider>

}

export {AuthContext}