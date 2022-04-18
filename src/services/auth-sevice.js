import axios from "axios"

const isPasswordValid = (password) => {
    if (
        password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) ==
        null
    )
        return false;
    else return true;
};

export const loginUser = async (email, password, setShowLoader, setLogin, userDispatch, setShowMsg, setErrorMsg, navigate) => {
    if (!isPasswordValid(password)) {
        setErrorMsg("Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.")
        setShowMsg(true);
    } else {
        try {
            setShowLoader(true)
            const { data: { foundUser, encodedToken } } = await axios({
                method: 'post',
                url: `/api/auth/login`,
                data: {
                    email, password
                }
            })
            if (foundUser && encodedToken) {
                localStorage.setItem("token", encodedToken)
                setLogin(foundUser);
                localStorage.setItem("login", JSON.stringify(foundUser));
                userDispatch({ type: "CLEAR" });
                navigate("/note")
            }
        } catch (error) {
            setErrorMsg("Something Went Wrong!!!")
            setShowMsg(true);
        } finally {
            setShowLoader(false)
        }
    }

}

export const createUser = async (firstName, lastName, email, password, userDispatch, setLogin, setShowLoader, setShowMsg, setErrorMsg, navigate) => {
    debugger;
    if (firstName === "" || lastName === "") {
        setErrorMsg("FirstName or LastName can not be empty!!!");
        setShowMsg(true)
    } else if (!isPasswordValid(password)) {
        setErrorMsg("Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.")
        setShowMsg(true);
    } else {
        try {
            setShowLoader(true)
            const { data } = await axios({
                method: "post",
                url: '/api/auth/signup',
                data: { email, password, firstName, lastName }
            })
            const { createdUser, encodedToken } = data;
            if (data) {
                setLogin(createdUser);
                localStorage.setItem("login", JSON.stringify(createdUser));
                localStorage.setItem("token", encodedToken)
                userDispatch({ type: "CLEAR" });
                navigate("/note")
            }
        } catch (error) {
            setErrorMsg("Something Went Wrong!!!")
            setShowMsg(true);
        } finally {
            setShowLoader(false);
            setShowMsg(false);
        }
    }
}

export const logOutUser = (setLogin, navigate) => {
    setLogin(false);
    localStorage.clear();
    navigate("/");
};