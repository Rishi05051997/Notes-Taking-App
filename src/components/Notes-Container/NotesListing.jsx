import { useData } from "../../context/DataProvider";
import { NotesCard } from "./NoteCard";
import empty from "./../../assets/empty-note.svg";
import "./noteslisting.css";
import { generalFilter } from "../../Utility/arrayFilter";
import { Sidebar } from "../Layout";
import { useAuth } from "../../context/AuthProvider";

export const NotesListing = () => {
    const { state: { notes, isPinned, isUnPinned, isPriority }, isExpanded, } = useData();
    const { login } = useAuth();
    const filteredNotes = generalFilter(notes, isPinned, isUnPinned, isPriority);
    return filteredNotes.length > 0 ? (
        <>
            <Sidebar login={login} />
            <div className={isExpanded ? "note-main-content" : "note-main-content-collasped"}>
                <div className="note-content">
                    <header>
                        <div className="highlightMainText head-1 notes-header">Notes</div>
                    </header>
                    <div className="note-listing">

                        {
                            filteredNotes.map(note => < NotesCard note={note} />)
                        }
                    </div>
                </div>
            </div>
        </>

    ) : (
        <>
            <Sidebar login={login} />
            <div className={isExpanded ? "note-main-content" : "note-main-content-collasped"}>
                <div className="note-content">
                    <div className="text-4 notes-header">No Notes Found</div>
                    <div className="empty-note">
                        <img src={empty} alt="No-data" />
                    </div>
                </div>
            </div>
        </>

    )
}