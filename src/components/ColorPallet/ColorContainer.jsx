import { Icon } from "@iconify/react";
import { useState } from "react";
import { ColorPallet } from "./ColorPallet";

import "./ColorPallet.css"

export const ColorContainer = ({ noteId, note, setNoteData }) => {
    const [showColorPallet, setShowColorPallet] = useState(false);
    return (
        <div className="color-pallet-container">
            <Icon className="iconify text-4 cursor_" icon="eva:color-palette-fill" onClick={() => setShowColorPallet(val => !val)} />
            {
                showColorPallet &&
                <ColorPallet setShowColorPallet={setShowColorPallet} noteId={noteId} note={note} setNoteData={setNoteData} />
            }

        </div>
    )
}