import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App'; 

function Letter({ letterPosition, attemptValue }) {
    const { board, correctWord, currentAttempt, disabledLetters, setDisabledLetters, pressedEnter, setPressedEnter } = useContext(AppContext);
    const letter = board[attemptValue][letterPosition];

    const correct = correctWord[letterPosition] === letter;
    const almost =  !correct && letter !== '' && correctWord.split('').includes(letter);
    
    let letterState;
    letterState = currentAttempt.attempt > attemptValue && 
        (correct ? 'correct' : almost ? 'almost' : 'error')

    useEffect(() => {
        if (letter !== '' && !correct && !almost && pressedEnter) {
            setDisabledLetters((prev) =>  disabledLetters.add(letter))
            setPressedEnter(false);
        }

    }, [almost, correct, disabledLetters, letter, setDisabledLetters, pressedEnter, setPressedEnter]);

    return (
        <div className='letter' id={letterState ? letterState : 'default'}>
            {letter}
        </div>
    );
};

export default Letter;