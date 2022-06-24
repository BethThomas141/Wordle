import './RowGrid.css';
import LetterRow from "../LettersRow/LetterRow";
import {useEffect, useState} from "react";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RowGrid({showLavalamps, setShowLavalamps}) {
    const [activeRow, setActiveRow] = useState(0);
    const [isCorrect, setIsCorrect] = useState(0);
    const [hasFailed, setHasFailed] = useState(0);
    const [answer, setAnswer] = useState(null);

    const konamiString = "lavalamps"
    const keycodeArray = [76, 65, 86, 65, 76, 65, 77, 80, 83]
    const rowIndexes = [0,1,2,3,4,5];
    const elexonAnswers = ["elexon", "itsdo", "indo", "forecast", "indicated", "demand", "bmrs", "bmunit", "fuelhh", "indgen", "melngc", "tsdf", "windfor", "retro", "tsdfw", "margin", "surplus", "qalex", "iris", "generals", "autopets", "sprint", "zaahir", "reza", "robin", "lukasz"];
    const normalAnswerList = ["plant", "train", "space", "alien", "house", "prank", "phone", "spike", "crust", "comet", "spend", "pound", "think", "clown", "trunk", "earth", "lunch", "extra"];
    const answerList = elexonAnswers
    let currentKonamiString = ""

    useEffect(() => {
        if (answer === null) {
            setAnswer(answerList[Math.floor(Math.random() * answerList.length)]);
        }
    }, []);

    const handleUserKeyPress = event => {
        const {key, keyCode} = event;
        console.log("just pressed", keyCode)
        console.log("current Konami string", currentKonamiString)
        console.log("compare to:", keycodeArray[currentKonamiString.length])
        if (keyCode === keycodeArray[currentKonamiString.length] ) {
            console.log("true")
            currentKonamiString = `${currentKonamiString}${key.toLowerCase()}`
            console.log(currentKonamiString)
            if (konamiString === currentKonamiString) {
                setShowLavalamps(true)
            }
            }
        else if (keyCode === 76) {
            currentKonamiString = "l"
        }
        else {
            currentKonamiString = ""
        }
        };

    useEffect(() => {
        if (isCorrect) {
            window.addEventListener('keydown', handleUserKeyPress);

            return () => {
                window.removeEventListener('keydown', handleUserKeyPress);
            };
        }
    }, [isCorrect]);

    return (
        <>
            <h1>Elexondle</h1>
            <div className="submission-text">
                {showLavalamps ? <p> yaaas lavalamps</p> : ""}
        {isCorrect ? <p>Hooray! You got it in <b>{activeRow}</b> {activeRow === 1 ? "guess" : "guesses"}! <FontAwesomeIcon icon={faArrowsRotate} onClick={() => window.location.reload()}/></p> : ""}
        {hasFailed ? <p>The answer was <b>{answer}</b> :( <FontAwesomeIcon icon={faArrowsRotate} onClick={() => window.location.reload()} size="xs"/></p> : ""}
            </div>
            <div className="square-container">
        {rowIndexes.map((id) => <LetterRow key={id} setHasFailed={setHasFailed} setIsCorrect={setIsCorrect} answer={answer} isCorrect={isCorrect} answerLength={answer?.length} activeRow={activeRow} setActiveRow={setActiveRow} isActive={activeRow === id && !isCorrect}/>)}
    </div></>)
}

export default RowGrid;