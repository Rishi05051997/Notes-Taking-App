export const generalFilter = (notesData, isPinned, isUnPinned, priority) => {
    if (isPinned) {
        return notesData.filter((note) => note.isPinned === true ? isPinned : false)
    } else if (isUnPinned) {
        return notesData.filter((note) => note.isPinned === false ? isUnPinned : false)
    }
    if (priority) {
        return notesData.filter((note) => note.selectedPriority === priority ? true : false)
    }
    else {
        return notesData;
    }
}