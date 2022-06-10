import './LetterRow.css';
import LetterSquare from "../LetterSquare/LetterSquare";
import {useState, useEffect} from "react";

function LetterRow({answer, activeRow, setActiveRow, isActive, setIsCorrect, setHasFailed}) {
    const [activeSquare, setActiveSquare] = useState(0);
    const [currentString, setCurrentString] = useState("")
    const [showMarking, setShowMarking] = useState(false)
    const [colourArray, setColourArray] = useState(["black", "black", "black", "black", "black"])

    const indexes = [0,1,2,3,4]
    const handleUserKeyPress = event => {
        if (isActive) {
            const {key, keyCode} = event;
            if ((keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) && currentString.length < 5) {
                setCurrentString(`${currentString}${key}`);
                setActiveSquare(activeSquare + 1);
            }

            if (keyCode === 8) {
                setActiveSquare(activeSquare - 1);
                setCurrentString(currentString.slice(0, -1));
            }

            if (event.key === "Enter" && currentString.length === 5) {
                let colour_array = [null, null, null, null, null]
                for (let i = 0; i < 5; i++) {
                    if (currentString[i] === answer[i] && (currentString.indexOf(currentString[i]) === i)) {
                        colour_array[i] = "green"
                    } else if (answer.includes(currentString[i]) && (currentString.indexOf(currentString[i]) === i)) {
                        colour_array[i] = "yellow"
                    } else {
                        colour_array[i] = "black"
                    }
                }
                if (currentString === answer) {
                    setIsCorrect(true)
                }
                if (currentString !== answer && activeRow === 5) {
                    setHasFailed(true)
                }
                setColourArray(colour_array);
                setShowMarking(true);
                setActiveRow(activeRow + 1);
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
        {indexes.map((id) => <LetterSquare key={id} markingColour={colourArray[id]} letterInput={currentString[id]} correctWord={answer} showMarking={showMarking}/>)}
    </div>)
}

export default LetterRow;