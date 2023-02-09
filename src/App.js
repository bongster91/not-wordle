import './App.css';
import React, { useEffect } from 'react';
import { useState, createContext } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';

export const AppContext = createContext();

function App() {
    const [ board, setBoard ] = useState(boardDefault);
    const [currentAttempt, setCurrentAttempt ] = useState({ attempt: 0, letterPosition: 0 });
    const [ wordSet, setWordSet ] = useState(new Set());
    const [ disabledLetters, setDisabledLetters ] = useState(new Set());
    const correctWord = 'RIGHT'

    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet)
        });
    }, []);

    const onSelectLetter = (keyValue) => {
        if (currentAttempt.letterPosition > 4) return;
        if (disabledLetters.has(keyValue.toUpperCase())) return;
       
        const newBoard = [...board];
        newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;
        setBoard(newBoard);
        setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition + 1 });
    };

    const onDelete = () => {
        if (currentAttempt.letterPosition === 0) return ;

        const newBoard = [...board];
        newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = '';
        setBoard(newBoard);
        setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 });
    };

    const onEnter = () => {
        if (currentAttempt.letterPosition !== 5) return;
       
        let currWord = '';
        for (let i = 0; i < 5; i++) {
            currWord += board[currentAttempt.attempt][i].toLowerCase();
        };

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 });
        } else {
            alert('word not found')
        };

        if (currWord === correctWord) {
            alert('You won!')
        }

    };

    return (
        <div className="App">
            <nav>
                <h1>Not Wordle</h1>
            </nav>

            <AppContext.Provider 
                value={{ 
                    board, 
                    setBoard, 
                    currentAttempt, 
                    setCurrentAttempt, 
                    onSelectLetter, 
                    onDelete, 
                    onEnter, correctWord, 
                    disabledLetters, 
                    setDisabledLetters 
                }}
            >
                <div className='game'>
                    <Board />
                    <Keyboard />
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default App;
