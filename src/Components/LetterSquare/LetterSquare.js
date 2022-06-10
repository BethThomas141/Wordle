import './LetterSquare.css';

function LetterSquare({letterInput, showMarking, markingColour}) {

    return (
        <div className={`letter-container ${showMarking ? "show-marking-" + markingColour: " "}`}>
            <p className="letter">
                {letterInput}
            </p>
        </div>
    );
}

export default LetterSquare;