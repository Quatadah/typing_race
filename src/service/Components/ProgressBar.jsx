import React from "react";

const Progressbar = ({ currentWord, text }) => {
    return (
        <div className="progress w-75 my-2 my-lg-4">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated py-2"
                role="progressbar"
                style={{
                    width: `${
                        ((currentWord === 0 ? currentWord : currentWord + 1) /
                            text.length) *
                        100
                    }%`,
                }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {Math.floor(((currentWord + 1) / text.length) * 100)}%
            </div>
        </div>
    );
};

export default Progressbar;
