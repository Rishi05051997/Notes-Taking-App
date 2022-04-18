import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import note from "./../../assets/main-page/note-main.svg";
import { Helmet } from "react-helmet";

export const LandingPage = () => {

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Note App | Main Page</title>
                <meta name="description" content="Main Page" />
            </Helmet>
            <div className="landing-page-wrapper">
                <div className="flex-row">
                    <section className="content-main">
                        <header className="head-1">
                            A Daily <span className="highlightMainText">Notes</span> App
                        </header>
                        <main className="landing-page-content">
                            <div className="text-5 bold">Introducing A Daily <span className="highlightMainText">Notes</span> App</div>
                            <div className="highlightMainText text-4 bold mar-y-2">A Note Taking App</div>
                            <ul className="listing-spec text-3 bold mar-y-2">
                                <li>
                                    <Icon className="iconify" icon="icon-park:correct" /> Effectively Handle Daily Task
                                </li>
                                <li>
                                    <Icon className="iconify" icon="icon-park:correct" /> User Friendly
                                </li>
                            </ul>
                        </main>
                        <footer className="landing-page-footer">
                            <button className="btn btn-join-now head-2 btn-primary">
                                <Link to="/login">
                                    Join Now
                                </Link>
                            </button>
                            <div className="footer-content mar-y-3">
                                <div className="text-3 highlightMainText bold row-justify-content-center cursor_" >
                                    <Link to="/signup">
                                        Already have an Account?
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </section>
                    <section className="landing-img-section">
                        <img src={note} alt="main-img" />
                    </section>
                </div>
            </div>
        </>
    )
} 