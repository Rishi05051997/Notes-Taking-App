export const deleteLableHandler = (e, val, setLabelArr) => {
    e.preventDefault();
    setLabelArr(lab => [...lab].filter(({ value }) => value !== val));
}
export const editLebaleHandler = (e, val, setLabelArr, setLabels) => {
    e.preventDefault();
    setLabelArr(lab => [...lab].filter(({ value }) => value !== val));
    setLabels(val)

}