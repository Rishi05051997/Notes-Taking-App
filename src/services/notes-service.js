import axios from "axios"

export const addNote = async (noteData, token, dispatch) => {
    const note = { note: noteData }
    try {
        const { data: { notes } } = await axios({
            method: 'post',
            url: `/api/notes`,
            data: JSON.stringify(note),
            headers: { authorization: token }
        })
        if (notes) {
            dispatch({ type: "ADD-NOTE", payload: noteData })
            dispatch({ type: "CLEAR-NOTE-FORM" })

        }
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Something went Wrong in adding note" });
    }
}

export const deleteNoteById = async (dispatch, token, _id) => {
    try {
        const { data: { notes } } = await axios({
            url: `/api/notes/${_id}`,
            method: "delete",
            headers: { authorization: token }
        })
        if (notes) {
            dispatch({ type: "DELETE-NOTE", payload: _id })
            return notes
        }
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Something went Wrong in deleting note" });
    }
}


export const updateNote = async (dispatch, token, _id, note) => {
    try {
        const { data: { notes } } = await axios({
            url: `/api/notes/${_id}`,
            method: 'post',
            data: { note },
            headers: { authorization: token }
        })
        if (notes) {
            dispatch({ type: "UPDATE-NOTE", payload: note })
        }
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Something went Wrong in updating note" });
    }
}