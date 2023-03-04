import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] =  useState({})
    const [currentUser, setCurrentUser] =  useState(JSON.parse(localStorage.getItem("user") || null))
    const [userID, setUserID] =  useState(JSON.parse(localStorage.getItem("userID" ) || null))
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false); //trust device or not when logging in 
    
    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(currentUser))
        localStorage.setItem("userID", JSON.stringify(userID))
    }, [currentUser, userID])

    return (
         <AuthContext.Provider value= {{ auth, setAuth, currentUser, setCurrentUser, userID, setUserID, persist, setPersist}}> 
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext}