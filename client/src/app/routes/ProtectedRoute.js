import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UnAuthorizedComponent from "../components/UnAuthorizedComponent/UnAuthorizedComponent";
import { AuthContext } from "../context/AuthContext";
export const ProtectedRoute = ({children,role}) => {
    const [authState] = useContext(AuthContext);
    if(!authState?.user?.name){
        return <Navigate to={'/signin'} />
    }
    if(authState?.user?.name && (authState.user.role !== 'admin' && authState.user.role !== role )){
        return <UnAuthorizedComponent/>
    }
    return children;
}