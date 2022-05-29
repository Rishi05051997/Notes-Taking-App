import { updateNote } from "../../services";

export const Selectbox = ({ options, dispatch, type, note, noteId, setNoteData }) => {
    const token = localStorage.getItem("token");
    const selectHandler = (e, type, note, noteId) => {
        switch (type) {
            case "PRIORITY":
                setNoteData((note) => ({
                    ...note,
                    selectedPriority: e.target.value
                }))
                break;
            case "LABELS":
                dispatch({ type: "LABELS-SELECTER", payload: e.target.value })
                break
            case "PRIORITY-UPDATE":
                updateNote(dispatch, token, noteId, { ...note, selectedPriority: e.target.value })
                break;
            case "PINNED":
                e.target.value === "Please Select" ? dispatch({ type: "CLEAR-FILTERS" }) : dispatch({ type: "FILTER-BASED-ON-PIN-NOTES", payload: e.target.value })
                break;
            default:
                break;
        }
    }
    return (

        <>
            <select name="" id="" className="head-3" onChange={(e) => selectHandler(e, type, note, noteId)}>
                {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
            </select>
        </>
    )
}