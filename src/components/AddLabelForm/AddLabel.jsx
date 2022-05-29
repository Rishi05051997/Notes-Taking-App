import { useData } from "../../context/DataProvider";
import { Icon } from "@iconify/react"
import { deleteLableHandler, editLebaleHandler } from "../../services";

export const AddLabel = ({ setIsAddLabel }) => {
    const { dispatch, labels, setLabels, labelArr, setLabelArr } = useData();


    const labelhandler = (e) => {
        setLabels(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (['Enter', 'Tab', ','].includes(e.key)) {
            e.preventDefault();

            let lebelVal = labels.trim();
            const labelObj = { value: lebelVal, label: lebelVal }
            if (lebelVal) {
                setLabelArr(val => [...val, labelObj]);
            }
        }
    }
    const onAddLabelForm = (e) => {
        e.preventDefault();
        dispatch({ type: "SET-LABELS", payload: labelArr })
        setIsAddLabel(val => !val)

    }
    return (
        <>
            <div className="modal">
                <div className="modal-container lg-modal-width mar-y-2">
                    <div className="modal-header pad-xs">
                        <div className="head-2 highlightMainText">Add Label</div>
                        <span
                            className="iconify modal-close text-3 highlightMainText cursor_"
                            data-icon="ant-design:close-circle-outlined"
                        ></span>
                    </div>
                    <form onSubmit={onAddLabelForm} >
                        <div className="modal-body text-2 pad-xs">
                            <div className="custom-input-one mar-y-2">
                                <input
                                    id="note-title"
                                    type="text"
                                    className="input-field"
                                    autoComplete="off"
                                    placeholder=" "
                                    value={labels}
                                    onChange={labelhandler}
                                    onKeyDown={handleKeyDown}
                                />
                                <label htmlFor="note-title" className="input-label text-2"
                                >Add Lebels</label
                                >
                            </div>

                        </div>

                        {
                            labelArr.length > 0 &&
                            <div className="chips-container">
                                {
                                    labelArr.map(({ value }, i) =>
                                        <button key={i} className="chips-btn" >
                                            <p>{value}</p> <Icon className="iconify cursor_" onClick={(e) => deleteLableHandler(e, value, setLabelArr)} icon="akar-icons:circle-x" />
                                            <Icon className="iconify cursor_" onClick={(e) => editLebaleHandler(e, value, setLabelArr, setLabels)} icon="akar-icons:edit" />
                                        </button>
                                    )
                                }

                            </div>
                        }
                        <div className="modal-footer pad-sm">
                            <button onClick={() => dispatch({ type: "OPEN-ADD-LABEL-MODAL" })} className="btn btn-primary" type="submit">
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Add Labels
                            </button>
                        </div>
                    </form>
                </div>
            </div >
            <div className="overlay"></div>
        </>
    )
}