import Loader from "../components/resusableComponent/Loader/Loader";

const { createContext, useReducer, useState } = require("react")
const initialState = {
    user: null
}
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "REMOVE_USER":
            return {...state,user:null}
        default:
            return state;
    }
}
const AuthContext = createContext(initialState);
const AuthProvider = (props) => {
    const [authState, authDispatch] = useReducer(
        props.AuthReducer,
        props.initialState
    )
    return (
        <AuthContext.Provider value={[authState, authDispatch]}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useLoader = () => {
    const [loading, setLoading] = useState(false);
  
    return [
      loading ? <Loader /> : null,
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    ];
  };

export {AuthProvider,AuthContext,initialState,AuthReducer,useLoader}