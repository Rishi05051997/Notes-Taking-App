import axios from "axios"
import { deleteArchiveNoteById } from "./archive-service";

export const MoveToTrash = async (dispatch, _id, note, token, navigate) => {
    try {
        const deleted = await deleteArchiveNoteById(dispatch, _id, note, token);
        if (deleted) {
            const { data: { archives } } = await axios({
                url: `/api/archives/restore/${_id}`,
                method: 'post',
                headers: { authorization: token }
            })
            if (archives) {
                dispatch({ type: "MOVE-TO-TRASH", payload: note });
                navigate("/trash")
            }
        }

    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Something went Wrong in moving note to Trash" });
    }
}

export const deleteNoteFromTrashById = async (dispatch, _id, note, token) => {
    try {
        const { data: { archives } } = await axios({
            url: `/api/archives/delete/${_id}`,
            method: 'delete',
            headers: { authorization: token }
        })
        if (archives) {
            dispatch({ type: "DELETE-FROM-TRASH", payload: _id })
            return archives;
        }
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Something went Wrong in deleting note from Trash" });
    }
}

export const MoveFromTrashToNote = async (dispatch, _id, noteData, token, navigate) => {
    const note = { note: noteData }
    try {
        const deleted = await deleteNoteFromTrashById(dispatch, _id, noteData, token);
        if (deleted) {
            const { data: { notes } } = await axios({
                url: `/api/notes/${_id}`,
                method: 'post',
                data: JSON.stringify(note),
                headers: { authorization: token }
            })
            if (notes) {

                dispatch({ type: "Move-From-Trash-To-Note", payload: noteData });
                navigate("/note")
            }
        }
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Something went Wrong in moving note from Trash to Notes" });
    }
}