import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <div className="App">
        <nav>
            <h1>Not Wordle</h1>
        </nav>
        <Board />
        <Keyboard />
    </div>
  );
}

export default App;
