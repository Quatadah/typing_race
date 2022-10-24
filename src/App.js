import { Component, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import Progressbar from "./Components/ProgressBar";
import Scoring from "./Components/Scoring";
import Typing from "./Components/Typing";
import HighScores from "./Components/HighScores";
import getText from "./service/textProvider";
import { hsfrom, hsto } from "./service/highScores";
import NavBar from "./Components/NavBar";

const App = () => {
    const [language, setLanguage] = useState("English");
    const [highScores, setHighScores] = useState(hsfrom());
    const [text, setText] = useState(getText(language).split(" "));
    const [word, setWord] = useState("");
    const [currentWord, setCurrentWord] = useState(0);
    const [isStateOk, setIsStateOk] = useState(true);
    const [score, setScore] = useState(0);
    const [hasEnded, setHasEnded] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [timer, setTimer] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setText(getText(language).split(" "));
        setHasStarted(false);
        setTimer(0);
        setIsStateOk(true);
        setCurrentWord(0);
        setWord("");
    }, [language]);

    useEffect(() => {
        console.log("highScores is : ", highScores);
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
    }, [hasStarted, language]);

    let handleStart = () => {
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
                hsto(countScore());
                setHighScores(hsfrom());
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
        setText(getText(language).split(" "));
    };

    let countScore = () => {
        let timeInSeconds = timer;
        let timeInMinutes = timeInSeconds / 60;
        let numberOfWords =
            text.map((word) => word.length).reduce((a, b) => a + b) / 4;
        return Math.round(numberOfWords / timeInMinutes);
    };

    return (
        <>
            <NavBar language={language} setLanguage={setLanguage} />
            <div className="container mt-5 ">
                <div className="row mt-5">
                    <div className="offset-lg-2 col-lg-8 ">
                        <h1 className="text-center">Typing race</h1>
                        <h4 className="text-center">Break your scores</h4>
                        <div className="bordering mt-1 mt-lg-3 py-2 shadow">
                            <Progressbar
                                currentWord={currentWord}
                                text={text}
                            />{" "}
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
                    <div className="col-12 text-center col-lg-2 align-vertical-center mt-4 pt-lg-5 mt-lg-2 mx-auto">
                        <h2 className="timer">
                            <span className="">{timer}</span>
                        </h2>
                        <div className="p-3">
                            {highScores.length > 0 && (
                                <HighScores highscores={highScores} />
                            )}
                        </div>
                    </div>
                    <Scoring
                        score={score}
                        hasEnded={hasEnded}
                        handleRestart={handleRestart}
                    />
                </div>
            </div>
            <div className="col-12 footers">
                <p className="">
                    Made with{" "}
                    <span role="img" aria-label="heart">
                        ❤️
                    </span>{" "}
                    by{" "}
                    <a href="https://quatadah.vercel.app" target="_blank">
                        <span className="">Quatadah </span>
                    </a>
                </p>
            </div>
        </>
    );
};

export default App;
