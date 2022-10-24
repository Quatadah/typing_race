import React from "react";

const Typing = ({
    word,
    isStateOk,
    text,
    currentWord,
    refProp: ref,
    handleChange,
    hasEnded,
    hasStarted,
    handleStart,
}) => {
    return (
        <>
            <p className="display-text p-3 text-justify">
                {text.map((word, i) => (
                    <span
                        key={i}
                        className={
                            currentWord === i
                                ? "fw-bold text-dark"
                                : "fw-normal"
                        }
                    >
                        {" "}
                        {word}{" "}
                    </span>
                ))}
            </p>
            <input
                ref={ref}
                onChange={(event) => handleChange(event)}
                type="text"
                value={word}
                className="form-control mb-4 text-input text-center fw-bold text-dark w-75"
                disabled
            />
            {!hasEnded && !hasStarted && (
                <button
                    className="btn btn-perso w-75"
                    onClick={() => handleStart()}
                >
                    START
                </button>
            )}
            <div
                className={`
                                ${isStateOk ? "text-success" : "text-danger"}
                                text-center fw-bold`}
            >
                {hasStarted
                    ? isStateOk
                        ? "Good job so far!"
                        : "Error ! Review the ongoing word "
                    : ""}
            </div>
        </>
    );
};

export default Typing;
