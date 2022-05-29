import { useData } from "../../context/DataProvider"
import { updateNote } from "../../services";
import { colorPalletData } from "./palletData"


export const ColorPallet = ({ setShowColorPallet, noteId, note, setNoteData }) => {
    const { dispatch } = useData();
    const token = localStorage.getItem("token");
    return (

        <div className="color-pallet">
            {
                colorPalletData.map(({ id, cssName, bgProp }) =>
                    <div key={id} className={`color-round cursor_ ${cssName}`} onClick={() => {
                        noteId ? updateNote(dispatch, token, noteId, { ...note, bgColor: bgProp }) :
                            setNoteData((note) => ({
                                ...note,
                                bgColor: bgProp
                            })
                            )
                        setShowColorPallet(val => !val)
                    }}></div>)
            }
        </div>)
}