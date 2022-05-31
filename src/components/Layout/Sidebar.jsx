import { Icon } from "@iconify/react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { logOutUser } from "../../services";
import { AddNote } from "../NoteForm/AddNote";
import { useState } from "react";
import { AddLabel } from "../AddLabelForm/AddLabel";


export const Sidebar = ({ login }) => {
    const { state: { isPinned }, isExpanded, setIsExpanded, dispatch } = useData();
    const navigate = useNavigate();
    const { setLogin } = useAuth();
    const [isAddNote, setIsAddNote] = useState(false);
    const [isAddLabel, setIsAddLabel] = useState(false)
    const { firstName } = JSON.parse(localStorage.getItem("login"))

    const handleToggler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            localStorage.setItem("sidebar-collasped");
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem("sidebar-collasped");
    }


    return login && (
        <>
            <div className="wrapper">
                <div className={isExpanded ? "sidebar" : "sidebar collapsed"}>
                    <header className="sidebar-header">
                        <div className="sidebar-icon text-4">
                            <Icon className="iconify highlightMainText" onClick={handleToggler} icon="carbon:menu" />
                        </div>
                        <h1 className="sidebar-logo head-1 highlightMainText">NOTE APP</h1>
                        <nav className="siderbar-navigation">
                            <button className="btn btn-primary" onClick={() => setIsAddNote(val => !val)}>Create Note</button>
                            <div className="badge-div highlightMainText">
                                <Icon className="iconify cursor_" icon="healthicons:ui-user-profile" />
                                <Link to="/profile"><div className="text-2 cursor_ highlightMainText" >{firstName}</div></Link>

                            </div>
                        </nav>
                    </header>
                    <main className="sidebar-items">
                        <div className="item">
                            <div className="sidebar-icon text-4">
                                <Icon className="iconify" onClick={handleToggler} icon="icon-park:notebook" />
                            </div>
                            <span className="sidebar-text text-4"><Link to="/note">Notes</Link></span>
                        </div>
                        <div className="item">
                            <div className="sidebar-icon text-4">
                                <Icon className="iconify" onClick={handleToggler} icon="noto:label" />
                            </div>
                            <span className="sidebar-text text-4" onClick={() => setIsAddLabel(val => !val)}>Add Labels</span>
                        </div>
                        <div className="item">
                            <div className="sidebar-icon text-4">
                                <Icon className="iconify" onClick={handleToggler} icon="icon-park:notebook-and-pen" />
                            </div>
                            <span className="sidebar-text text-4"><Link to="/archive">Archive Notes</Link></span>
                        </div>
                        <div className="item">
                            <div className="sidebar-icon text-4">
                                <Icon className="iconify" onClick={handleToggler} icon="icon-park:notebook-one" />
                            </div>
                            <span className="sidebar-text text-4"><Link to="/trash">Trash Notes</Link></span>
                        </div>
                        <div className="item">
                            <div className="sidebar-icon text-4">
                                <Icon className="iconify" icon="mdi-light:logout" />
                            </div>
                            <span className="sidebar-text text-4" onClick={() => logOutUser(setLogin, navigate)}>Logout</span>
                        </div>
                    </main>
                </div>
                <section className={isExpanded ? "note-main-content" : "note-main-content-collasped"}>
                    <header className="content-header">
                        <div className="sort-by-field" >
                            <label htmlFor="sortBy" className="head-3">Filter By</label>
                            <input type="checkbox" name="isPinned" value={isPinned} onChange={() =>
                                dispatch({ type: "FILTER-BASED-ON-PINNED" })
                            } />
                            <label className="text-2 bold" htmlFor="t-shirt">
                                {isPinned ? "Pinned" : "Un Pinned"} Notes
                            </label>
                        </div>
                        <nav className="content-nav text-3 bold">
                            <div className="highlightMainText head-3">PRIORITY</div>
                            <div className="priority-round cursor_" onClick={() => dispatch({ type: "FILTER-BASED-ON-PRIORITY", payload: "High" })}>HIGH</div>
                            <div className="priority-round cursor_" onClick={() => dispatch({ type: "FILTER-BASED-ON-PRIORITY", payload: "Medium" })}>MEDIUM</div>
                            <div className="priority-round cursor_" onClick={() => dispatch({ type: "FILTER-BASED-ON-PRIORITY", payload: "Low" })}>LOW</div>
                            <div className="priority-round cursor_" onClick={() => dispatch({ type: "CLEAR-FILTERS" })}>CLEAR ALL</div>
                        </nav>

                    </header>
                </section>


            </div>
            {
                isAddNote && <AddNote setIsAddNote={setIsAddNote} />
            }
            {
                isAddLabel && <AddLabel setIsAddLabel={setIsAddLabel} />
            }
        </>
    )
}