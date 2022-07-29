import React from "react";

const Scoring = ({ hasEnded, handleRestart, score }) => {
    if (hasEnded)
        return (
            <div className="speed bordering mt-5 mb-2 pt-3 shadow w-50 text-center offset-3">
                <h2>Your Speed</h2>
                <p className="text-secondary fw-bold">{score} wpm</p>
                <button
                    className="btn btn-perso w-75"
                    onClick={() => handleRestart()}
                >
                    RESTART
                </button>
            </div>
        );
};

export default Scoring;
