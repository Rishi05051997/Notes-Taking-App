import { createContext, useContext, useReducer, useState } from "react";
import { DataReducer } from "../reducers/DataReducer";

const intialStateValue = {
    isModelOpen: false,
    notes: [],
    archives: [],
    trash: [],
    isPriority: "",
    isPinned: false,
    isUnPinned: false,
    toastMsg: "",
    selectedLabels: [],

}

const dataContext = createContext(intialStateValue);

const DataProvider = ({ children }) => {
    const sidebarCollasped = localStorage.getItem("sidebar-collasped");
    const [isExpanded, setIsExpanded] = useState(sidebarCollasped ? true : false);
    const [state, dispatch] = useReducer(DataReducer, intialStateValue);
    const [labels, setLabels] = useState("");
    const [labelArr, setLabelArr] = useState([]);

    return (
        <dataContext.Provider value={{ state, dispatch, isExpanded, setIsExpanded, labels, setLabels, labelArr, setLabelArr }}>
            {
                children
            }
        </dataContext.Provider>
    )
}

const useData = () => useContext(dataContext);

export { DataProvider, useData, intialStateValue }