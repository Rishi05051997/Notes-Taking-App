import ReactQuill from "react-quill";
import { Icon } from "@iconify/react"
import { deleteNoteById } from "../../services";
import { useData } from "../../context/DataProvider";
import { ColorContainer } from "../ColorPallet/ColorContainer";
import { Selectbox } from "../SelectBox/Selectbox";
import { ArchiveNoteById } from "../../services";
import { useNavigate } from "react-router-dom";
import { AddNote } from "../NoteForm/AddNote";
import { useState } from "react";
// import { deleteLableHandler } from "../../services";
// import Select from 'react-select';

const priority = ["Please Select Priority", "High", "Medium", "Low"]


export const NotesCard = ({ note }) => {
    const { _id, title, enteredNotes, bgColor, selectedPriority } = note;
    const token = localStorage.getItem("token");
    const { dispatch } = useData();
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);


    return (
        <>
            <div className={`container-card xxl-card-width ${bgColor} mar-md`}>
                <div className="card-header pad-xs card-badge" data-label={selectedPriority}>
                    <div className="head-2 highlightMainText">{title}</div>
                </div>
                <div className="card-body">
                    <ReactQuill
                        value={enteredNotes}
                        readOnly={true}
                        theme={"bubble"}
                    />
                    {
                        note.selectedLabels.length > 0 &&
                        <>
                            <div className="highlightMainText head-3">Selected Labels</div>
                            <div className="chips-container">

                                {
                                    note.selectedLabels.map(({ value }, i) =>
                                        <button key={i} className="chips-btn" >
                                            <p>{value}</p>
                                        </button>
                                    )
                                }

                            </div>
                        </>
                    }
                </div>
                <footer>
                    <div className="card-footer text-5 mar-xs pad-xs">
                        <Icon className="iconify cursor_" icon="fluent:delete-28-regular" onClick={() => deleteNoteById(dispatch, token, _id)} />
                        < ColorContainer noteId={_id} note={note} />
                        < Selectbox options={priority} dispatch={dispatch} type="PRIORITY-UPDATE" noteId={_id} note={note} />
                        <Icon className="iconify cursor_" icon="bxs:archive-in" onClick={() => ArchiveNoteById(dispatch, _id, note, token, navigate)} />
                        <Icon className="iconify cursor_" icon="akar-icons:edit" onClick={() => setIsEditable(val => !val)} />
                        {/* <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={selectedLabels}
                        onChange={(e) => ({ ...note, selectedLabels: [...note.selectedLabels].concat(e) })}
                    /> */}
                        {
                            note.isPinned ?
                                <Icon
                                    className="iconify cursor_ text-5"
                                    icon="noto-v1:pushpin"
                                /> :
                                <Icon
                                    className="iconify cursor_ text-5"
                                    icon="fluent:pin-off-16-filled"
                                />

                        }

                    </div>
                </footer>
                {/* <div className="badge-overlay">
                    <span className="top-right badge red">{selectedPriority}</span>
                </div> */}

            </div>
            {
                isEditable && < AddNote editingNoteData={note} setIsEditable={setIsEditable} isEditable={isEditable} />
            }
        </>

    )
}