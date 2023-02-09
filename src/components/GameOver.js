import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
    const { gameOver, handleReset, correctWord, currentAttempt } = useContext(AppContext);

    return (
        <div className='gameOver'>
            <h3>{gameOver.guessedWord ? 'You guessed correctly!!' : 'You failed :('}</h3>
            <h3>Correct Word: {correctWord}</h3>

            {
                gameOver.guessedWord && 
                (<h3>
                    You guessed in {currentAttempt.attempt} attempts
                </h3>)
            }
            <button className='gameover-button' onClick={handleReset}>Another Round?</button>
        </div>
    );
};

export default GameOver;