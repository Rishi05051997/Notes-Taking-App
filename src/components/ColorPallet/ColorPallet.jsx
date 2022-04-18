import { useData } from "../../context/DataProvider"
import { updateNote } from "../../services";

const colorPalletData = [
    {
        id: 1,
        cssName: "red",
        bgProp: "bgRed"
    },
    {
        id: 2,
        cssName: "green",
        bgProp: "bgGreen"
    },
    {
        id: 3,
        cssName: "yellow",
        bgProp: "bgYellow"
    },
    {
        id: 4,
        cssName: "purple",
        bgProp: "bgPurple"
    },
    {
        id: 5,
        cssName: "naviBlue",
        bgProp: "bgBlue"
    },
    {
        id: 6,
        cssName: "pink",
        bgProp: "bgPink"
    },
]

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