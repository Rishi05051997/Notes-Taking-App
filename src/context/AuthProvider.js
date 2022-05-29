import { useContext, createContext, useReducer, useState } from "react";
import { AuthReducer } from "../reducers/AuthReducer";

const intialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const authContext = createContext(intialState);



const AuthProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(AuthReducer, intialState);
    const [loader, setShowLoader] = useState();
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")) || false);
    const [showMsg, setShowMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <>
            <authContext.Provider value={{ userState, userDispatch, loader, setShowLoader, login, setLogin, showMsg, setShowMsg, errorMsg, setErrorMsg }}>
                {
                    children
                }
            </authContext.Provider>
        </>)
}

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider, intialState }