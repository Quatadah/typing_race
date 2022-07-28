import { Component, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import Progressbar from "./service/Components/ProgressBar";
import Scoring from "./service/Components/Scoring";
import Typing from "./service/Components/Typing";
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

    useEffect(() => {
        let interval;
        if (hasStarted) {
            interval = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [hasStarted]);

    let handleStart = () => {
        console.log("start");
        setHasStarted(true);
        setHasEnded(false);
        ref.current.disabled = false;
        ref.current.focus();
    };

    let handleChange = (event) => {
        const word = event.target.value;
        if (word.endsWith(" ")) {
            if (word.trim() !== text[currentWord]) {
                setIsStateOk(false);
            } else {
                setIsStateOk(true);
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
                setHasStarted(false);
                setWord("");
                setTimer(0);
                setScore(countScore());
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
    };

    let countScore = () => {
        let timeInSeconds = timer;
        let timeInMinutes = timeInSeconds / 60;
        return Math.ceil(currentWord / timeInMinutes);
    };

    return (
        <div className="container mt-5">
            <div className="row mt-5">
                <div className="offset-lg-2 col-lg-8 ">
                    <h1 className="text-center">RUN</h1>
                    <div className="bordering mt-1 mt-lg-3 py-2 shadow">
                        <Progressbar currentWord={currentWord} text={text} />{" "}
                        <Typing
                            text={text}
                            word={word}
                            currentWord={currentWord}
                            isStateOk={isStateOk}
                            hasEnded={hasEnded}
                            hasStarted={hasStarted}
                            handleChange={handleChange}
                            handleStart={handleStart}
                            handleRestart={handleRestart}
                            refProp={ref}
                        />
                    </div>
                </div>
                <div className="col-12 text-center col-lg-2 align-vertical-center mt-4 mt-lg-2 mx-auto">
                    <h2 className="fw-bold badge bg-warning">
                        timer : <span className="">{timer}</span>
                    </h2>
                </div>
                <Scoring
                    score={score}
                    hasEnded={hasEnded}
                    handleRestart={handleRestart}
                />
            </div>
        </div>
    );
};

export default App;
