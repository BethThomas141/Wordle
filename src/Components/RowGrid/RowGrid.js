import './RowGrid.css';
import LetterRow from "../LettersRow/LetterRow";
import {useState} from "react";

function RowGrid() {
    const [activeRow, setActiveRow] = useState(0);
    const [isCorrect, setIsCorrect] = useState(0);
    const [hasFailed, setHasFailed] = useState(0);
    const rowIndexes = [0,1,2,3,4,5];
    const answer = "plant";

    return (<div className="square-container">
        {isCorrect ? <p>Hooray! You got it in <b>{activeRow}</b> {activeRow === 1 ? "guess" : "guesses"}!</p> : ""}
        {hasFailed ? <p>The answer was <b>{answer}</b> :(</p> : ""}
        {rowIndexes.map((id) => <LetterRow key={id} setHasFailed={setHasFailed} setIsCorrect={setIsCorrect} answer={answer} activeRow={activeRow} setActiveRow={setActiveRow} isActive={activeRow === id}/>)}
    </div>)
}

export default RowGrid;