import React from 'react';

const WordHandler = ({ selectedWord, correctLetters, clueLetter }) => {
  return (
    <div>
      <button className='clue' onClick={clueLetter}></button>
      <div className="word">
        {selectedWord.split('').map((letter, i) => {
          return (
            <span className="letter" key={i}>
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default WordHandler;
