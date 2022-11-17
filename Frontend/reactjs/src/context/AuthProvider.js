import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] =  useState({})
    const [currentUser, setCurrentUser] =  useState(JSON.parse(localStorage.getItem("user") || null))
    // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
         <AuthContext.Provider value= {{ auth, setAuth, currentUser, setCurrentUser}}> 
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext}