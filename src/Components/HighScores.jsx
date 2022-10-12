import React from "react";

const HighScores = ({ highscores }) => {
    return (
        <div className="col-12 text-center align-vertical-center mt-4 mt-lg-2 mx-auto bordering shadow p-2">
            <h2 className="highScores">
                <span className="">High Scores</span>
            </h2>
            <ul className="list-group list-group-flush">
                {highscores.map((hs, index) => (
                    <li key={index} className="list-group-item">
                        {hs}wpm
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HighScores;
