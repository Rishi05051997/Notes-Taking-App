import { useData } from "../../context/DataProvider";
import { TrashCard } from "./TrashCard";
import empty from "./../../assets/empty-note.svg";
import { Sidebar } from "../Layout";
import { useAuth } from "../../context/AuthProvider";
import { generalFilter } from "../../Utility/arrayFilter";

export const TrashListing = () => {
    const { state: { trash, isPinned, isUnPinned, isPriority }, isExpanded, } = useData();
    const { login } = useAuth();
    const filteredNotes = generalFilter(trash, isPinned, isUnPinned, isPriority);
    return filteredNotes.length > 0 ? (
        <>
            < Sidebar login={login} />
            <div className={isExpanded ? "note-main-content" : "note-main-content-collasped"}>
                <div className="note-content">
                    <header>
                        <div className="highlightMainText head-1 notes-header">Trash Notes</div>
                    </header>
                    <div className="note-listing">

                        {
                            filteredNotes.map(trash => < TrashCard trash={trash} />)
                        }
                    </div>
                </div>
            </div>
        </>

    ) : (
        <>
            < Sidebar login={login} />
            <div className={isExpanded ? "note-main-content" : "note-main-content-collasped"}>
                <div className="note-content">
                    <div className="text-4 notes-header">No Trash Notes Found</div>
                    <div className="empty-note">
                        <img src={empty} alt="No-data" />
                    </div>
                </div>
            </div>
        </>

    )
}