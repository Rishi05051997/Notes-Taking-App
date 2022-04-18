import { intialStateValue } from "./../context/DataProvider"

export const DataReducer = (state, action) => {
    switch (action.type) {

        case "OPEN-ADD-LABEL-MODAL":
            return { ...state, isAddLebelModalOpen: !state.isAddLebelModalOpen }

        case "SET-LABELS":
            return {
                ...state,
                selectedLabels: [...state.selectedLabels].concat(action.payload)
            }


        case "ADD-NOTE":
            return {
                ...state,
                toastMsg: "New Note Added Successfully",
                notes: [...state.notes].concat(action.payload)
            }

        case "DELETE-NOTE":
            return {
                ...state,
                toastMsg: `Note deleted Successfully`,
                notes: [...state.notes].filter(({ _id }) => _id !== action.payload)
            }

        case "UPDATE-NOTE":
            return {
                ...state,
                toastMsg: `Notes Updated Successfully`,
                isEditable: true, notes: [...state.notes].map((note) => note._id === action.payload._id ? action.payload : note)
            }


        case "MOVE-TO-ARCHIVE":
            return {
                ...state,
                toastMsg: ` note is moving to Archives`,
                notes: [...state.notes].filter(({ _id }) => _id !== action.payload._id),
                archives: [...state.archives].concat(action.payload)
            }

        case "DELETE-FROM-ARCHIVE":
            return {
                ...state,
                toastMsg: ` note deleted from Archived`,
                archives: [...state.archives].filter(({ _id }) => _id !== action.payload)
            }

        case "MOVE-FROM-ARCHIVE-TO-NOTE":
            return {
                ...state,
                toastMsg: ` note is moving from archive to the notes`,
                notes: [...state.notes].concat(action.payload)
            }

        case "CLEAR-NOTE-FORM":
            return { ...state, intialStateValue }

        case "MOVE-TO-TRASH":
            return {
                ...state,
                toastMsg: ` note is moving from Archived to the Trash Bin`,
                archives: [...state.archives].filter(({ _id }) => _id !== action.payload),
                trash: [...state.trash].concat(action.payload)
            }

        case "DELETE-FROM-TRASH":
            return {
                ...state,
                toastMsg: `note deleted from Trash Successfully`,
                trash: [...state.trash].filter(({ _id }) => _id !== action.payload)
            }

        case "Move-From-Trash-To-Note":
            return {
                ...state,
                toastMsg: `note is moving from Trash to the Noets`,
                notes: [...state.notes].concat(action.payload)
            }

        case "FILTER-BASED-ON-PRIORITY":
            return { ...state, isPriority: action.payload }

        case "FILTER-BASED-ON-PIN-NOTES":
            return { ...state, isPinned: action.payload === "PINNED NOTES" ? true : false }

        case "FILTER-BASED-ON-PINNED":
            return { ...state, isPinned: !state.isPinned }

        case "FILTER-BASED-ON-UNPINNED":
            return { ...state, isUnPinned: !state.isUnPinned }


        case "CLEAR-FILTERS":
            return {
                ...state,
                isPinned: false,
                isUnPinned: false,
                isPriority: ""
            }
        case "SHOW_TOAST":
            return { ...state, toastMsg: action.payload };
        default:
            return state
    }
}