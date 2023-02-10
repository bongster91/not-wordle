import React, { useCallback, useEffect, useContext, useMemo } from 'react';
import Key from "./Key";
import { AppContext } from '../App';

function Keyboard() {
    const { onEnter, onDelete, onSelectLetter, disabledLetters } = useContext(AppContext);

    const keys1 = useMemo(() => ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], []);
    const keys2 = useMemo(() => ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], []);
    const keys3 = useMemo(() => ['Z', 'X', 'C', 'V', 'B', 'N', 'M'], []);
    
    const handleKeyboard = useCallback((event) => {
        if (event.key === 'Enter') {
            onEnter();

        } else if (event.key === 'Backspace') {
            onDelete();

        } else {
            keys1.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
            });

            keys2.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
            });

            keys3.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
            });
        };
    }, [keys1, keys2, keys3, onDelete, onEnter, onSelectLetter]);
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard);
        return () => {
            document.removeEventListener('keydown', handleKeyboard)
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <div className="line1">
                {
                    keys1.map((key, i) => {
                        return <Key keyValue={key} key={i} disabled={disabledLetters.has(key)} />
                    })
                }
            </div>

            <div className="line2">
                {
                    keys2.map((key, i) => {
                        return <Key keyValue={key} key={i} disabled={disabledLetters.has(key)} />
                    })
                }
            </div>

            <div className="line3">
                <Key keyValue={'ENTER'} bigKey />
                {
                    keys3.map((key, i) => {
                        return <Key keyValue={key} key={i} disabled={disabledLetters.has(key)} />
                    })
                }
                <Key keyValue={'DELETE'} bigKey />
            </div>
        </div>
    );
};

export default React.memo(Keyboard);