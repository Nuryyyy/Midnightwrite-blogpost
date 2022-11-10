import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
    //    auth && auth.user
       auth?.user
            ? <Outlet /> //child component of require auth
        :<Navigate to='/' state={{from: location}} replace />
       )


}

export default RequireAuth