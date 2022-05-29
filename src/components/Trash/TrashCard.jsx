import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useData } from "../../context/DataProvider";
import { deleteNoteFromTrashById, MoveFromTrashToNote } from "../../services";



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
                </div>
            </footer>
        </div>
    )
}