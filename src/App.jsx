import React, { useState, useEffect } from 'react';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import WordHandler from './components/WordHandler';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show } from './helpers/helpers';
import WordFetcher from './components/WordFetcher';
import Library from './components/Library';  
import AllLibrary from './components/AllLibrary';
import './App.css';
import './Media.css';

const words = WordFetcher();
let selectedWordPair = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [clueUsed, setClueUsed] = useState(false);
  const [seen, setSeen] = useState([]);
  const [correctlyGuessedWords, setCorrectlyGuessedWords] = useState([]);
  const [usedWords, setUsedWords] = useState([]); // Track used words
  const [isLibraryOpen, setIsLibraryOpen] = useState(false); 
  const [isAllWordsOpen, setIsAllWordsOpen] = useState(false); 

  const processLetter = (letter) => {
    if (selectedWordPair.spanish.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters(currentLetters => [...currentLetters, letter]);
      } else {
        show(setShowNotification);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(currentLetters => [...currentLetters, letter]);
      } else {
        show(setShowNotification);
      }
    }
  };

  useEffect(() => {
    const currentWordPair = `${selectedWordPair.swedish.replace(/^(.)/, (match) => match.toUpperCase())} - ${selectedWordPair.spanish.replace(/^(.)/, (match) => match.toUpperCase())}`;
    setSeen([currentWordPair]); 
  }, []);  

  const handleButtonClick = (letter) => {
    if (playable) {
      processLetter(letter.toLowerCase());
    }
  };

  const clueLetter = () => {
    if (!clueUsed) {
      const firstUnrevealedLetter = selectedWordPair.spanish.split('').find(letter => !correctLetters.includes(letter));
      if (firstUnrevealedLetter) {
        setCorrectLetters(currentLetters => [...currentLetters, firstUnrevealedLetter]);
      }
      setClueUsed(true);
    }
  };

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setClueUsed(false);

    if (correctLetters.length === selectedWordPair.spanish.length) {
      setCorrectlyGuessedWords(prev => [...prev, selectedWordPair]);
      setUsedWords(prev => [...prev, selectedWordPair]); // Add to used words
    } else {
      setCorrectlyGuessedWords([]);
      setUsedWords([]); // Reset used words on loss
    }

    const remainingWords = words.filter(word => !usedWords.includes(word));
    if (remainingWords.length === 0) {
      return;
    }

    const random = Math.floor(Math.random() * remainingWords.length);
    selectedWordPair = remainingWords[random];

    const newWordPair = `${selectedWordPair.swedish.replace(/^(.)/, (match) => match.toUpperCase())} - ${selectedWordPair.spanish.replace(/^(.)/, (match) => match.toUpperCase())}`;
    setSeen(currentSeen => {
      if (!currentSeen.includes(newWordPair)) {
        return [...currentSeen, newWordPair];
      }
      return currentSeen;
    });
  }

  const alphabet = 'abcdefghijklmnñopqrstuvwxyz'.split('');

  const sortedWords = [...words].sort((a, b) => a.swedish.localeCompare(b.swedish));
  return (
    <>
      <h1 className="huvudrubrik">Hänga Gubbe / El ahorcado</h1>
      <div className="word-to-guess">
      <h2> Gissa det spanska ordet för:<br/><span>{selectedWordPair.swedish.toUpperCase()}</span></h2>
      </div>
      <button className="brain" onClick={() => setIsLibraryOpen(true)}>{seen.length}</button>
      <button className="book" onClick={() => setIsAllWordsOpen(true)}>{words.length}</button>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <WordHandler selectedWord={selectedWordPair.spanish} correctLetters={correctLetters} clueLetter={clueLetter} />
      </div>
      <div className="keyboard">
        {alphabet.map(letter => (
          <button key={letter} onClick={() => handleButtonClick(letter)}>{letter.toUpperCase()}</button>
        ))}
      </div> 
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWordPair.spanish} setPlayable={setPlayable} playAgain={playAgain} amountOfWords={words.length}/>
      <Notification showNotification={showNotification} />
      <AllLibrary showAllWords={isAllWordsOpen} allWords={sortedWords} closeModal={() => setIsAllWordsOpen(false)} />
      <Library showLibrary={isLibraryOpen} seenWords={seen} closeModal={() => setIsLibraryOpen(false)} />
    </>
  );
}

export default App;