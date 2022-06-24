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
    const elexonAnswers = ["elexon", "itsdo", "indo", "forecast", "indicated", "demand", "bmrs", "bmunit", "generation", "fuelhh", "indgen", "melngc", "tsdf", "lavalamp", "windfor", "tsdfw", "margin", "surplus", "qalex", "iris", "generals", "autopets", "sprint"];
    const normalAnswerList = ["plant", "train", "space", "alien", "house", "prank", "phone", "spike", "crust", "comet", "spend", "pound", "think", "clown", "trunk", "earth", "lunch", "extra"];
    const answerList = ["elexon"]

    useEffect(() => {
        if (answer === null) {
            setAnswer(answerList[Math.floor(Math.random() * answerList.length)]);
        }
    }, []);


    return (
        <>
            <h1>Elexondle</h1>
            <div className="submission-text">
        {isCorrect ? <p>Hooray! You got it in <b>{activeRow}</b> {activeRow === 1 ? "guess" : "guesses"}! <FontAwesomeIcon icon={faArrowsRotate} onClick={() => window.location.reload()}/></p> : ""}
        {hasFailed ? <p>The answer was <b>{answer}</b> :( <FontAwesomeIcon icon={faArrowsRotate} onClick={() => window.location.reload()} size="xs"/></p> : ""}
            </div>
            <div className="square-container">
        {rowIndexes.map((id) => <LetterRow key={id} setHasFailed={setHasFailed} setIsCorrect={setIsCorrect} answer={answer} answerLength={answer?.length} activeRow={activeRow} setActiveRow={setActiveRow} isActive={activeRow === id}/>)}
    </div></>)
}

export default RowGrid;