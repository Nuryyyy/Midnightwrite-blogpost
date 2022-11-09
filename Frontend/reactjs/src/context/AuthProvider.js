import React from "react";
import { createContext, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] =  useState({})

    const logout = async() => {
        await axios.get("/logout"
        )
        setAuth({})
    }

    return (
        <AuthContext.Provider value= {{ auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext}