import React from 'react';

const Figure = ({ wrongLetters }) => {
    const errors = wrongLetters.length;
    return (
        <svg height="160" width="128" viewBox="0 0 128 160" className="figure-container">
            {/* <!-- Rod --> */}
            <line x1="38" y1="13" x2="90" y2="13" />
            <line x1="90" y1="13" x2="90" y2="32" />
            <line x1="38" y1="13" x2="38" y2="147" />
            <line x1="13" y1="147" x2="64" y2="147" />
            {/* <!-- Head --> */}
            {errors > 0 && <circle cx="90" cy="45" r="13" />}
            {/* <!-- Body --> */}
            {errors > 1 && <line x1="90" y1="58" x2="90" y2="96" />}
            {/* <!-- Arms --> */}
            {errors > 2 && <line x1="90" y1="77" x2="77" y2="64" />}
            {errors > 3 && <line x1="90" y1="77" x2="103" y2="64" />}
            {/* <!-- Legs --> */}
            {errors > 4 && <line x1="90" y1="96" x2="77" y2="115" />}
            {errors > 5 && <line x1="90" y1="96" x2="103" y2="115" />}
        </svg>
    );
};

export default Figure;
