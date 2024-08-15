import React, { useEffect, useState } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, amountOfWords }) => {
    const [winstreak, setWinstreak] = useState(0);
    const [sessionWins, setSessionWins] = useState(0);
    const [finalMessage, setFinalMessage] = useState('');
    const [playable, setPlayableState] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0); 

    useEffect(() => {
        const gameStatus = checkWin(correctLetters, wrongLetters, selectedWord);
        if (gameStatus === 'win') {
            setFinalMessage('✅ Korrekt! ✅');
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            setSessionWins(prevSessionWins => prevSessionWins + 1);
            setPlayableState(false);
        } else if (gameStatus === 'lose') {
            setFinalMessage('❌ Inkorrekt... ❌');
            setWinstreak(0);
            setPlayableState(false);
        } else {
            setFinalMessage('');
            setPlayableState(true);
        }
    }, [correctLetters, wrongLetters, selectedWord]);

    useEffect(() => {
        setPlayable(playable);
    }, [playable, setPlayable]);

    useEffect(() => {
        let timer;
        if (playable) {
            timer = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!playable && winstreak === amountOfWords) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [playable, winstreak, amountOfWords]);

    const handlePlayAgain = () => {
        if (amountOfWords === winstreak) {
            window.location.reload();
        } else {
            if (finalMessage.includes('Inkorrekt')) {
                setSessionWins(0);
                setWinstreak(0);
                setElapsedTime(0);
            }
            setPlayable(true);
            playAgain();
        }
    };

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    return (
        <div>
            <h2 className='winstreak'>{winstreak}</h2>
            <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
                <div className="popup">
                    <h2>{finalMessage}</h2>
                    <h3>Det rätta ordet är: <span className="displayed-correct-word">{selectedWord.toUpperCase()}</span></h3>
                    {finalMessage.includes('Inkorrekt') && (
                        <>
                        <p>Du vann totalt <span className="totaltsiffra">{sessionWins}</span> gånger innan du förlorade.</p>
                        <p><span className="winningmessage">Du spelade {minutes}:{seconds} minuter</span></p>
                        </>
                    )}
                    {finalMessage.includes('Korrekt') && amountOfWords === winstreak && (
                        <>
                            <p><span className="winningmessage">👏Grattis!👏</span></p>
                            <p><span className="winningmessage">Du klarade av alla ord i spelet!</span></p>
                            <p><span className="winningmessage">{sessionWins} ord på {minutes}:{seconds} minuter</span></p>
                        </>
                    )}
                    <button onClick={handlePlayAgain}>Spela igen</button>
                </div> 
            </div>
        </div>
    );
}

export default Popup;