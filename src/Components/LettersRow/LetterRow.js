import './LetterRow.css';
import LetterSquare from "../LetterSquare/LetterSquare";
import {useState, useEffect} from "react";

function LetterRow({answer, activeRow, setActiveRow, isActive, setIsCorrect, isCorrect, setHasFailed, answerLength}) {
    const [activeSquare, setActiveSquare] = useState(null);
    const [currentString, setCurrentString] = useState("")
    const [showMarking, setShowMarking] = useState(false)
    const [colourArray, setColourArray] = useState([])
    const [konamiCount, setKonamiCount] = useState(0);

    useEffect(() => {
        if (isActive) {
            setActiveSquare(0);
        }
    }, [isActive]);
    const konamiArray = ["l", "a", "v", "a"]
    const keycodeArray = [76, 65, 86, 65]
    const indexes = [...Array(answerLength).keys()]
    const handleUserKeyPress = event => {
        const {key, keyCode} = event;
        if (isActive) {
            if (keyCode !== 32) {
                setKonamiCount(0)
            }
            if ((keyCode >= 65 && keyCode <= 90) && currentString.length < answerLength) {
                setCurrentString(`${currentString}${key.toLowerCase()}`);
                setActiveSquare(activeSquare + 1);
            }

            if (keyCode === 8) {
                setActiveSquare(activeSquare - 1);
                setCurrentString(currentString.slice(0, -1));
            }

            if (event.key === "Enter" && currentString.length === answerLength) {
                let colour_array = Array(answerLength).fill(null)
                let green_letters = [];
                let yellow_letters = [];
                for (let i = 0; i < answerLength; i++) {
                    let candidateLetter = currentString[i];
                    let l = new RegExp(candidateLetter, 'g');
                    if (candidateLetter === answer[i]) {
                        colour_array[i] = "green"
                        green_letters.push(candidateLetter)
                    }}
                for (let i = 0; i < answerLength; i++) {
                    let candidateLetter = currentString[i];
                    let l = new RegExp(candidateLetter, 'g');
                    if (colour_array[i] == "green") {continue}
                   else if (answer.includes(candidateLetter) && ((answer.match(l) || []).length > (green_letters.filter(x => x==candidateLetter).length) + yellow_letters.filter(x => x==candidateLetter).length))
                    {
                        console.log("answer", (answer.match(l) || []).length)
                        console.log(green_letters.filter(x => x==candidateLetter).length)
                        console.log(yellow_letters.filter(x => x==candidateLetter).length)
                        colour_array[i] = "yellow"
                        yellow_letters.push(candidateLetter)
                    } else {
                        colour_array[i] = "black"
                    }
                }
                if (currentString !== answer && activeRow === 5) {
                    setHasFailed(true)
                }
                setColourArray(colour_array);
                setShowMarking(true);
                setActiveRow(activeRow + 1);
                if (currentString === answer) {
                    setIsCorrect(true)
                }
            }

            if (keyCode === 32) {
                setKonamiCount(konamiCount + 1);
                if (konamiCount === 4) {
                    setIsCorrect(true);
                    setActiveRow(null);
                    setCurrentString(answer);
                    setColourArray(Array(answerLength).fill("green"))
                    setShowMarking(true);
                    setActiveRow(activeRow + 1);
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    });

    return (<div className="square-container">
        {indexes.map((id) => <LetterSquare key={id} isActive={activeSquare === id} squareId={id} markingColour={colourArray[id]} letterInput={currentString[id]} correctWord={answer} showMarking={showMarking}/>)}
    </div>)
}

export default LetterRow;