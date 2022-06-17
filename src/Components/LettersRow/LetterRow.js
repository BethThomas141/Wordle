import './LetterRow.css';
import LetterSquare from "../LetterSquare/LetterSquare";
import {useState, useEffect} from "react";

function LetterRow({answer, activeRow, setActiveRow, isActive, setIsCorrect, setHasFailed}) {
    const [activeSquare, setActiveSquare] = useState(null);
    const [currentString, setCurrentString] = useState("")
    const [showMarking, setShowMarking] = useState(false)
    const [colourArray, setColourArray] = useState(["black", "black", "black", "black", "black"])
    const [konamiCount, setKonamiCount] = useState(0);

    useEffect(() => {
        if (isActive) {
            setActiveSquare(0);
        }
    }, [isActive]);

    const indexes = [0,1,2,3,4]
    const handleUserKeyPress = event => {
        if (isActive) {
            const {key, keyCode} = event;
            if (keyCode !== 32) {
                setKonamiCount(0)
            }
            if ((keyCode >= 65 && keyCode <= 90) && currentString.length < 5) {
                setCurrentString(`${currentString}${key.toLowerCase()}`);
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

            if (keyCode === 32) {
                setKonamiCount(konamiCount + 1);
                if (konamiCount === 4) {
                    setIsCorrect(true);
                    setCurrentString(answer);
                    setColourArray(["green", "green", "green", "green", "green"])
                    setShowMarking(true);
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