import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { boardDefault, generateWordSet, getNewWord } from './Words';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
    const [ board, setBoard ] = useState(boardDefault);
    const [ currentAttempt, setCurrentAttempt ] = useState({ attempt: 0, letterPosition: 0 });
    const [ wordSet, setWordSet ] = useState(new Set());
    const [ disabledLetters, setDisabledLetters ] = useState(new Set());
    const [ gameOver, setGameOver ] = useState({ gameOver: false, guessedWord: false });
    const [ correctWord, setCorrectWord ] = useState('');

    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet)
        });
        getNewWord().then((word) => {
            setCorrectWord(word)
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
        if (currentAttempt.letterPosition === 0) return;

        const newBoard = [...board];
        newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = '';
        setBoard(newBoard);
        setCurrentAttempt({ ...currentAttempt, letterPosition: currentAttempt.letterPosition - 1 });
    };

    const onEnter = () => {
        if (currentAttempt.letterPosition !== 5) return;
        console.log(correctWord)
        let currWord = '';
        for (let i = 0; i < 5; i++) {
            currWord += board[currentAttempt.attempt][i].toLowerCase();
        };

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 });
        } else {
            return alert('Invalid word')
        };

        if (currWord.toUpperCase() === correctWord) {
            setGameOver({ gameOver: true, guessedWord: true });
            return;
        };

        if (currentAttempt.attempt === 5) {
            setGameOver({ gameOver: true, guessedWord: false });
            return;
        };

    };

    function handleReset() {
        setCurrentAttempt({ attempt: 0, letterPosition: 0 });
        setDisabledLetters(new Set());
        setBoard([
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ]);
        getNewWord().then((word) => {
            wordSet.delete(correctWord.toLowerCase())
            setCorrectWord(word);
            setWordSet(new Set(wordSet));
        });
        setGameOver({ gameOver: false, guessedWord: false });
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
                    setDisabledLetters,
                    gameOver,
                    setGameOver,
                    handleReset,
                }}
            >
                <div className='game'>
                    <Board />

                    {
                        gameOver.gameOver ?
                        <GameOver />
                        :
                        <Keyboard />
                    }
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default App;
