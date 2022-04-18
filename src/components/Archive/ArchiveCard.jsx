import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useData } from "../../context/DataProvider";
import { deleteArchiveNoteById, MoveToTrash, updateArchive } from "../../services";


export const ArchiveCard = ({ archive }) => {
    const { _id, title, enteredNotes, bgColor, selectedPriority } = archive;
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
                    <Icon className="iconify cursor_" icon="fluent:delete-28-regular" onClick={() => deleteArchiveNoteById(dispatch, _id, archive, token)} />
                    <Icon className="iconify cursor_" icon="bxs:archive-out" onClick={() => updateArchive(dispatch, _id, archive, token, "MOVE-TO-NOTE")} />
                    <Icon className="iconify cursor_" icon="akar-icons:trash-bin" onClick={() => MoveToTrash(dispatch, _id, archive, token, navigate)} />
                    {
                        archive.isPinned ?
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