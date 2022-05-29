import { RotatingSquare } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { createUser } from "../../services";

export const Signup = () => {
    const navigate = useNavigate();
    const { userState: { firstName, lastName, email, password }, userDispatch, loader, setShowLoader, setLogin, showMsg, setShowMsg, errorMsg, setErrorMsg } = useAuth();
    const signupFormHandler = (e) => {
        e.preventDefault()
        createUser(firstName, lastName, email, password, userDispatch, setLogin, setShowLoader, setShowMsg, setErrorMsg, navigate)

    }
    return loader ? (
        <div className="loader-container">
            <RotatingSquare ariaLabel="rotating-square" visible={true} color="#3b82f6" />
        </div>

    ) : (
        <>
            <section className="form-section">
                <form onSubmit={signupFormHandler} action="" className="form container-card xxl-card-width pad-lg">
                    <div className="head-2 highlightMainText bold">Sign Up</div>
                    <div className="custom-input-one mar-y-4">
                        <input
                            id="fName"
                            type="text"
                            className="input-field"
                            autoComplete="off"
                            placeholder=" "
                            onChange={(e) => userDispatch({ type: "SET-FIRSTNAME", payload: e.target.value })}
                        />
                        <label htmlFor="fName" className="input-label text-2">
                            First Name
                        </label>
                    </div>
                    <div className="custom-input-one mar-y-2">
                        <input
                            id="lName"
                            type="text"
                            className="input-field"
                            autoComplete="off"
                            placeholder=" "
                            onChange={(e) => userDispatch({ type: "SET-LASTNAME", payload: e.target.value })}
                        />
                        <label htmlFor="lName" className="input-label text-2">
                            Last Name
                        </label>
                    </div>
                    <div className="custom-input-one mar-y-2">
                        <input
                            id="email"
                            type="email"
                            className="input-field"
                            autoComplete="off"
                            placeholder=" "
                            onChange={(e) => userDispatch({ type: "SET-EMAIL", payload: e.target.value })}
                        />
                        <label htmlFor="email" className="input-label text-2">
                            Enter Your Email Id Here
                        </label>
                    </div>
                    <div className="custom-input-one mar-y-2">
                        <input
                            id="password"
                            type="password"
                            className="input-field"
                            autoComplete="off"
                            placeholder=" "
                            onChange={(e) => userDispatch({ type: "SET-PASSWORD", payload: e.target.value })}
                        />
                        <span
                            className="iconify icons text-2"
                            data-icon="akar-icons:eye-slashed"
                        ></span>
                        <label htmlFor="password" className="input-label text-2">
                            Enter Your Password Here
                        </label>
                    </div >
                    <div className="mar-y-2">
                        <button type="submit" className="btn btn-primary form-btn text-2 bold">
                            Sign Up
                        </button>
                    </div>
                    <div className="mar-y-2 head-4">
                        {showMsg && <p className="highlightMainText">{errorMsg}</p>}
                    </div>
                    <div className="text-2 mar-y-2">
                        Forgot Your Password ?
                        <span className="bold cursor_">
                            <a href="./changePassword.html">Reset Here</a>
                        </span>
                    </div>
                    <div className="text-2 mar-y-2">
                        If Already User ?
                        <span className="bold cursor_">
                            <a href="./login.html">Login here</a>
                        </span>
                    </div>
                </form >
            </section >
        </>
    )
}