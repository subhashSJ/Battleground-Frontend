import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoutes = () =>{
    console.log(isAuthenticated());
    return(
        isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;
