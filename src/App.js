import { Component, useRef, useState } from "react";
import "./App.css";
import getText from "./service/textProvider";

const App = () => {
    const [text, setText] = useState(getText().split(" "));
    const [word, setWord] = useState("");
    const [currentWord, setCurrentWord] = useState(0);
    const [isStateOk, setIsStateOk] = useState(true);
    const [score, setScore] = useState(0);
    const [hasEnded, setHasEnded] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [timer, setTimer] = useState(0);

    const ref = useRef(null);

    let handleStart = () => {
        setHasStarted(true);
        setHasEnded(false);
        ref.current.disabled = false;
        ref.current.focus();
        setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    let handleChange = (event) => {
        const word = event.target.value;
        if (word.endsWith(" ")) {
            if (word.trim() !== text[currentWord]) {
                setIsStateOk(false);
            } else {
                setIsStateOk(true);
                setScore(score + 1);
                setWord("");
                setCurrentWord(currentWord + 1);
            }
        } else {
            if (
                currentWord === text.length - 1 &&
                word === text[text.length - 1]
            ) {
                ref.current.disabled = true;
                setHasEnded(true);
                setHasStarted(true);
                setWord("");
                setTimer(0);
                countScore();
                clearInterval(timer);
            }
            setWord(word);
        }
    };

    let handleRestart = () => {
        ref.current.disabled = false;
        ref.current.focus();
        setHasEnded(false);
        setHasStarted(true);
        setScore(0);
        setCurrentWord(0);
        setWord("");
        //clearInterval(timer);
    };

    let countScore = () => {};

    return (
        <div className="container mt-5">
            <div className="row mt-5">
                <div className="offset-lg-2 col-lg-8 ">
                    <h1 className="text-center">RUN </h1>
                    <div className="bordering mt-5 pt-2">
                        {" "}
                        <p className="display-text p-3">
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
                        {hasEnded && (
                            <button
                                className="btn btn-perso w-75"
                                onClick={() => handleRestart()}
                            >
                                RESTART
                            </button>
                        )}
                        {!hasStarted && (
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
                        <div className="score mt-3"></div>
                    </div>
                </div>
                <div className="col-12 text-center col-lg-1 align-vertical-center mt-4 mt-lg-2">
                    <h3 className="">{timer}</h3>
                </div>
            </div>
        </div>
    );
};

export default App;
