import React from 'react';

const AllLibrary = ({ showAllWords, allWords, closeModal }) => {
    const capitalizeFirstLetter = (word) => {
        if (!word) return '';  
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const wordItems = []; 
    allWords.forEach((wordpar, index) => {
        wordItems.push(
            <li key={index}>
                {capitalizeFirstLetter(wordpar.swedish) + '\u00A0 - \u00A0' + capitalizeFirstLetter(wordpar.spanish)}
            </li>
        );
    });

    return (
        <div className={`library-container ${showAllWords ? 'show' : ''}`} style={{ display: showAllWords ? 'flex' : 'none' }}>
            <div className="library-content">
                <h2>Alla ord</h2>
                <ul>
                    {wordItems} 
                </ul>
                <button onClick={closeModal}>Stäng</button>
            </div>
        </div>
    );
};

export default AllLibrary;
