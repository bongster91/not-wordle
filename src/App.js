import './App.css';
import { useState, createContext } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault } from './Words';

export const AppContext = createContext();

function App() {
    const [ board, setBoard ] = useState(boardDefault);
    const [currentAttempt, setCurrentAttempt ] = useState({ attempt: 0, letterPosition: 0 });

    const correctWord = 'RIGHT'

    const onSelectLetter = (keyValue) => {
        if (currentAttempt.letterPosition > 4) return ;

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
        setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 });
    };

    return (
        <div className="App">
            <nav>
                <h1>Not Wordle</h1>
            </nav>

            <AppContext.Provider value={
                { board, setBoard, currentAttempt, setCurrentAttempt, onSelectLetter, onDelete, onEnter, correctWord }
            }>
                <div className='game'>
                    <Board />
                    <Keyboard />
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default App;
