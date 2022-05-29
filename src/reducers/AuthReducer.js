import { intialState } from "../context/AuthProvider"

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case "SET-FIRSTNAME":
            return { ...state, firstName: action.payload }

        case "SET-LASTNAME":
            return { ...state, lastName: action.payload }

        case "SET-EMAIL":
            return { ...state, email: action.payload }

        case "SET-PASSWORD":
            return { ...state, password: action.payload }

        case "CLEAR":
            return { ...intialState };

        default:
            return state;
    }
}