//single selection
//multiple selection
import { useState } from "react";
import data from "./data";
import "./styles.css"

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiSelected, setMultiSelected] = useState([]);

  function handleSingleSelection(getCurrentId){
    setSelected(getCurrentId === selected ? null: getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiSelected = [...multiSelected];
    const findIndexofCurrentId = copyMultiSelected.indexOf(getCurrentId);
    if (findIndexofCurrentId === -1) copyMultiSelected.push(getCurrentId)
    else copyMultiSelected.splice(findIndexofCurrentId, 1)

    setMultiSelected(copyMultiSelected);
  }

    return (
        <div className="wrapper">
          <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi-selection {enableMultiSelection? "on":"off"}</button>
            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item">
                            <div onClick={
                              enableMultiSelection? 
                              () => handleMultiSelection(dataItem.id) :
                              () => handleSingleSelection(dataItem.id)
                              } className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                selected === dataItem.id || multiSelected.indexOf(dataItem.id) !== -1 ?
                                <div className="content">{dataItem.answer}</div>
                                : null
                            }
                        </div>
                      ))
                    ) : (
                      <div>No data found!</div>
                )}
            </div>
        </div>);
}