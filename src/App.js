import './App.css';
import { useState, createContext } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault } from './Words';

export const AppContext = createContext();

function App() {
    const [ board, setBoard ] = useState(boardDefault);

    return (
        <div className="App">
            <nav>
                <h1>Not Wordle</h1>
            </nav>

            <AppContext.Provider value={{ board, setBoard }}>
                <div className='game'>
                    <Board />
                    <Keyboard />
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default App;
