import { useData } from "../../context/DataProvider"
import { ArchiveCard } from "./ArchiveCard"
import empty from "./../../assets/empty-note.svg"
import { Sidebar } from "../Layout"
import { useAuth } from "../../context/AuthProvider"
import { generalFilter } from "../../Utility/arrayFilter";

export const ArchiveListing = () => {
    const { state: { archives, isPinned, isUnPinned, isPriority }, isExpanded, } = useData();
    const { login } = useAuth();
    const filteredNotes = generalFilter(archives, isPinned, isUnPinned, isPriority);
    return filteredNotes.length > 0 ? (
        <>
            <Sidebar login={login} />
            <div className={isExpanded ? "note-main-content" : "note-main-content-collasped"}>
                <div className="note-content">
                    <header>
                        <div className="highlightMainText head-1 notes-header">Archive Notes</div>
                    </header>
                    <div className="note-listing">

                        {
                            filteredNotes.map(archive => < ArchiveCard archive={archive} />)
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
                    <div className="text-4 notes-header">No Archives Notes Found</div>
                    <div className="empty-note">
                        <img src={empty} alt="No-data" />
                    </div>

                </div>
            </div>
        </>

    )
}