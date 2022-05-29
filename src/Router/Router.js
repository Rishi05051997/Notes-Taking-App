import { Route, Routes } from "react-router-dom";
import { ArchiveListing } from "../components/Archive/ArchiveListing";
import { NotesListing } from "../components/Notes-Container/NotesListing";
import { Profile } from "../components/Profile/Profile";
import { TrashListing } from "../components/Trash/TrashListing";
import { PrivateRouter } from "../private-router/Private-Rounter";
import { Login, Signup } from "./../components/Auth";
import { LandingPage } from "./../components/Landing/LandingPage";
export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={< LandingPage />} />
            <Route path="/login" element={< Login />} />
            <Route path="/signup" element={< Signup />} />
            <Route path="/note" element={
                <PrivateRouter>
                    < NotesListing />
                </PrivateRouter>}
            />
            <Route path="/archive" element={
                <PrivateRouter>
                    < ArchiveListing />
                </PrivateRouter>}
            />
            <Route path="/trash" element={
                <PrivateRouter>
                    < TrashListing />
                </PrivateRouter>}
            />
            <Route path="/profile" element={
                <PrivateRouter>
                    < Profile />
                </PrivateRouter>}
            />
        </Routes>
    )
}