import './LetterSquare.css';

function LetterSquare({letterInput, showMarking, markingColour, isActive, squareId}) {

    return (
        <div className={`letter-container delay-${squareId} ${isActive ? "active" : ""} ${showMarking ? "show-marking-" + markingColour: " "}`}>
            <p className="letter">
                {letterInput}
            </p>
        </div>
    );
}

export default LetterSquare;