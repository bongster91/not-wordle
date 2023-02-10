import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App'; 

function Letter({ letterPosition, attemptValue }) {
    const { board, correctWord, currentAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptValue][letterPosition];

    const correct = correctWord[letterPosition] === letter;
    const almost =  !correct && letter !== '' && correctWord.split('').includes(letter);

    const letterState = currentAttempt.attempt > attemptValue && 
        (correct ? 'correct' : almost ? 'almost' : 'error')

    useEffect(() => {
        if (letter !== '' && !correct && !almost) {
            setDisabledLetters((prev) =>  disabledLetters.add(letter))
        }
    }, [currentAttempt.attempt, almost, correct]);
    
    return (
        <div className='letter' id={letterState}>
            {letter}
        </div>
    );
};

export default Letter;