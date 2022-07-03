import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { NavLink,useNavigate} from "react-router-dom";
import {toast} from 'react-toastify'
import { AuthContext, useLoader } from "../../context/AuthContext";
import helperService from '../../services/helperService'
const SigninComponent = () => {
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
    const [authState,authDispatch] = useContext(AuthContext);
    const [loader,showLoader,hideLoader] = useLoader()
    const navigation = useNavigate()
    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            showLoader()
            const {message,data} = await helperService.signin(JSON.stringify(user));
            toast(message)
            localStorage.setItem('user',JSON.stringify(data))
            authDispatch({type:'SET_USER',payload:data})
            navigation('/')
            hideLoader()
        } catch (err) {
            hideLoader()
            console.log(err)
            toast(err.message);
                
        }
    }
    return (
        <div className="sigin-container container">
            {loader}
            <div className="row justify-content-center">
                <div className="card col-md-5 mt-5">
                    <h4 className="text-center">Sign In</h4>
                    <input type="text" placeholder="name" className="form-control m-2"
                        onChange={e => { setUser({ ...user, name: e.target.value }) }}
                    />
                    <input type="password" placeholder="password" className="form-control m-2"
                        onChange={e => { setUser({ ...user, password: e.target.value }) }}
                    />
                    <div className="button-container mx-auto">
                        <button className="btn btn-info m-2 align-center"
                            onClick={handleSignin}
                        >Sign in</button>
                    </div>
                    <div className="text-center m-2">
                        Don't Have An Account <NavLink to={'/signup'} >Sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninComponent