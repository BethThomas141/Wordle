import './RowGrid.css';
import LetterRow from "../LettersRow/LetterRow";
import {useEffect, useState} from "react";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RowGrid() {
    const [activeRow, setActiveRow] = useState(0);
    const [isCorrect, setIsCorrect] = useState(0);
    const [hasFailed, setHasFailed] = useState(0);
    const [answer, setAnswer] = useState(null);
    const rowIndexes = [0,1,2,3,4,5];
    const answerList = ["plant", "train", "space", "alien", "house", "prank", "phone", "spike", "crust", "comet", "spend", "pound", "think", "clown", "trunk", "earth", "lunch", "extra"];

    useEffect(() => {
        if (answer === null) {
            setAnswer(answerList[Math.floor(Math.random() * answerList.length)]);
        }
    }, []);


    return (
        <>
        <div className="square-container">
        {isCorrect ? <p>Hooray! You got it in <b>{activeRow}</b> {activeRow === 1 ? "guess" : "guesses"}! <FontAwesomeIcon icon={faArrowsRotate} onClick={() => window.location.reload()}/></p> : ""}
        {hasFailed ? <p>The answer was <b>{answer}</b> :( <FontAwesomeIcon icon={faArrowsRotate} onClick={() => window.location.reload()} size="xs"/></p> : ""}
        {rowIndexes.map((id) => <LetterRow key={id} setHasFailed={setHasFailed} setIsCorrect={setIsCorrect} answer={answer} activeRow={activeRow} setActiveRow={setActiveRow} isActive={activeRow === id}/>)}
    </div></>)
}

export default RowGrid;