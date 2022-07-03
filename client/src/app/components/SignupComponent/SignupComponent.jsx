import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify'
import { useLoader } from "../../context/AuthContext";
import helperService from '../../services/helperService'
const SignupComponent = () => {
    const navigate = useNavigate();
    const [loader,showLoader,hideLoader] = useLoader()
    const [user, setUser] = useState({
        name: '',
        password: '',
        role: ''
    })
    const handleSignup= async (e) => {
        e.preventDefault();
        try {
            showLoader()
            const {status,message} = await helperService.signup(JSON.stringify(user));
            toast(message)
            navigate('/signin')
            hideLoader()
        } catch (err) {
            console.log(err.message)
            toast(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            hideLoader()
        }
    }
    return (
        <div className="sigin-container container">
            {loader}
            <div className="row justify-content-center">
                <div className="card col-md-5 mt-5">
                    <h4 className="text-center">Sign UP</h4>
                    <p className="text-center">Create Account with us</p>
                    <input type="text" placeholder="name" className="form-control m-2"
                        onChange={e => { setUser({ ...user, name: e.target.value }) }}
                    />
                    <input type="password" placeholder="password" className="form-control m-2"
                        onChange={e => { setUser({ ...user, password: e.target.value }) }}
                    />
                    <select placeholder="role" className="form-control m-2"
                        onChange={e => { setUser({ ...user, role: e.target.value }) }}
                    >
                        <option value={'admin'}>ADMIN</option>
                        <option value={'seller'}>SELLER</option>
                        <option value={'supporter'}>SUPPORTER</option>
                        <option value={'customer'}>CUSTOMER</option>
                    </select>
                    <div className="button-container mx-auto">
                        <button className="btn btn-info m-2 align-center"
                            onClick={handleSignup}
                        >Create Account</button>
                    </div>
                    <div className="text-center m-2">
                        Already Have An Account <NavLink to={'/signin'} >Sign In</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupComponent