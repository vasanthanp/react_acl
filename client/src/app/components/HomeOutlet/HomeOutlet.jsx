import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import helperService from "../../services/helperService";

const HomeOutlet = () => {
    const [authState, authDispatch] = useContext(AuthContext);
    const navigate = useNavigate()
    const fetchUser = async () => {
        try {
            const { user } = await helperService.getUserWithToken();
            authDispatch({ type: 'SET_USER', payload: user })
        } catch (err) {
            toast()
            navigate('/signin')
        }
    }
    const logOutHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem('user');
        authDispatch({ type: 'REMOVE_USER' })
        navigate('/signin')
    }
    // useEffect(() => {
    //     if (authState.user && !authState.user?.name) {
    //         fetchUser()
    //     }
    // }, [])
    return (
        <div className="app">
            {authState.user && <button className="btn btn-danger float-right m-2" onClick={logOutHandler}>Log out</button>}
            <Outlet />
        </div>
    )
}
export default HomeOutlet