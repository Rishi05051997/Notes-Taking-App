import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addnote.css";
import { ColorContainer } from "../ColorPallet/ColorContainer";
import { Selectbox } from "../SelectBox/Selectbox";
import { useData } from "../../context/DataProvider";
import { addNote, updateNote } from "../../services";
import { useState } from "react";
import { Icon } from "@iconify/react";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


const modules = {
    toolbar: [
        [{ header: [3, 4, false] }],
        ["bold", "italic", "underline", "line-through"],
        [{ list: "ordered" }, { list: "bullet" }],
    ],
};


const priority = ["Please Select Priority", "High", "Medium", "Low"]

const intialState = {
    _id: "",
    title: "",
    enteredNotes: "",
    isPinned: false,
    bgColor: "white",
    error: "",
    selectedLabels: [],
    selectedPriority: "High",
}

export const AddNote = ({ isEditable, setIsEditable, setIsAddNote, editingNoteData = intialState }) => {
    const { state: { selectedLabels }, dispatch } = useData();
    const [noteData, setNoteData] = useState(editingNoteData);
    const [errorMsg, setErrorMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const noteFormHandler = (e) => {
        e.preventDefault();
        if (noteData.title === "" || noteData.enteredNotes === "") {
            setErrorMsg("Note Title or Entered Note can not be empty!!!");
            setShowMsg(true);
        } else {
            const token = localStorage.getItem("token");
            const noteFinalData = { ...noteData, _id: Math.floor((Math.random() * 1000) + 1), }
            isEditable ? updateNote(dispatch, token, noteFinalData._id, noteData) : addNote(noteFinalData, token, dispatch);
            isEditable ? setIsEditable((val) => !val) : setIsAddNote(val => !val);
        }

    }
    const labelsOnChangeHandler = (value, event) => {
        if (event.action === "select-option" && event.option.value ===
            "*") {
            setNoteData((note) => ({
                ...note,
                selectedLabels: [...note.selectedLabels].concat(event.option.value)
            }));
        } else if (event.action === "deselect-option" &&
            event.option.value === "*") {
            setNoteData((note) => ({
                ...note,
                selectedLabels: []
            }));
        } else if (event.action === "deselect-option") {
            setNoteData((note) => ({
                ...note,
                selectedLabels: [...note.selectedLabels].filter(({ value }) => value !== event.option.value)
            }));
        } else if (value.length === selectedLabels.length - 1) {
            setNoteData((note) => ({
                ...note,
                selectedLabels: selectedLabels
            }));
        } else {
            setNoteData((note) => ({
                ...note,
                selectedLabels: value
            }));
        }
    }
    return (
        <>
            <div className="modal">
                <div className={`modal-container xl-modal-width mar-y-2 ${noteData.bgColor}`}>
                    <div className="modal-header pad-xs  card-badge" data-label={noteData.selectedPriority}>
                        <div className="head-2 highlightMainText">
                            {
                                isEditable ? "Edit Note" : "Add New Note"
                            }
                        </div>
                        <span
                            className="iconify modal-close text-3 highlightMainText cursor_"
                            data-icon="ant-design:close-circle-outlined"
                        ></span>
                    </div>
                    <form onSubmit={noteFormHandler}>
                        <div className="modal-body text-2 pad-xs">
                            <div className="custom-input-one mar-y-2">
                                <input
                                    id="note-title"
                                    type="text"
                                    className="input-field"
                                    autoComplete="off"
                                    placeholder=" "
                                    value={noteData.title}
                                    onChange={(e) =>
                                        setNoteData((note) => ({
                                            ...note,
                                            title: e.target.value
                                        }))
                                    }
                                />
                                <label htmlFor="note-title" className="input-label text-2"
                                >Note Title</label
                                >
                            </div>
                            <div className="editor">
                                <ReactQuill
                                    placeholder="Add your notes here"
                                    modules={modules}
                                    value={noteData.enteredNotes}
                                    onChange={(e) =>
                                        setNoteData((note) => ({
                                            ...note,
                                            enteredNotes: e
                                        }))}
                                />
                            </div>
                            <div className="mar-y-2">
                                <span className="highlightMainText head-3">{showMsg && errorMsg}</span>
                            </div>
                            <div className="featured-row mar-y-5">
                                < ColorContainer setNoteData={setNoteData} />
                                < Selectbox options={priority} dispatch={dispatch} setNoteData={setNoteData} type="PRIORITY" />
                                <ReactMultiSelectCheckboxes
                                    value={noteData.selectedLabels}
                                    onChange={labelsOnChangeHandler}
                                    setState={setNoteData}
                                    options={selectedLabels}
                                />
                            </div>
                        </div>
                        <div className="modal-footer pad-sm">
                            <button type="submit" className="btn btn-primary" onClick={() => { isEditable ? setIsEditable(val => !val) : setIsAddNote(val => !val) }}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {
                                    isEditable ? "Edit Note" : "Add New Note"
                                }
                            </button>
                            {
                                noteData.isPinned ?
                                    <Icon
                                        onClick={() => (
                                            setNoteData((note) => ({
                                                ...note,
                                                isPinned: !note.isPinned
                                            }))
                                        )}
                                        className="iconify cursor_ text-5"
                                        icon="noto-v1:pushpin"
                                    /> :
                                    <Icon
                                        onClick={() => (
                                            setNoteData((note) => ({
                                                ...note,
                                                isPinned: !note.isPinned
                                            }))
                                        )}
                                        className="iconify cursor_ text-5"
                                        icon="fluent:pin-off-16-filled"
                                    />

                            }
                        </div>
                    </form>
                </div>

            </div >
            <div className="overlay"></div>
        </>
    )
}