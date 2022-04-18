import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useData } from "../../context/DataProvider";
import { deleteNoteFromTrashById, MoveFromTrashToNote } from "../../services";
// import { deleteLableHandler } from "../../services";
// import Select from 'react-select';



export const TrashCard = ({ trash }) => {
    const { _id, title, enteredNotes, bgColor, selectedPriority } = trash;
    const token = localStorage.getItem("token");
    const { dispatch } = useData();
    const navigate = useNavigate();

    return (
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
                {/* {
                    note.selectedLabels.length > 0 &&
                    <div className="chips-container">
                        {
                            note.selectedLabels.map(({ value }, i) =>
                                <button key={i} className="chips-btn" >
                                    <p>{value}</p> <Icon className="iconify cursor_" onClick={(e) => deleteLableHandler(e, value, setLabelArr)} icon="akar-icons:circle-x" />
                                </button>
                            )
                        }

                    </div>
                } */}
            </div>
            <footer>
                <div className="card-footer text-5 mar-xs pad-xs">
                    <Icon className="iconify cursor_" icon="fluent:delete-28-regular" onClick={() => deleteNoteFromTrashById(dispatch, _id, trash, token)} />
                    <Icon className="iconify cursor_" icon="bxs:archive-out" onClick={() => MoveFromTrashToNote(dispatch, _id, trash, token, navigate)} />
                    {
                        trash.isPinned ?
                            <Icon
                                className="iconify cursor_ text-5"
                                icon="noto-v1:pushpin"
                            /> :
                            <Icon
                                className="iconify cursor_ text-5"
                                icon="fluent:pin-off-16-filled"
                            />

                    }
                    {/* <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={selectedLabels}
                        onChange={(e) => ({ ...note, selectedLabels: [...note.selectedLabels].concat(e) })}
                    /> */}

                </div>
            </footer>
        </div>
    )
}