import HighScores from "../Components/HighScores";

export function hsfrom() {
    const highscores = window.localStorage.getItem("highScoresRun") || "";
    if (!highscores) return [];
    const toReturn = highscores
        .split(",")
        .map((el) => parseInt(el))
        .sort((a, b) => b - a)
        .splice(0, 3);
    return toReturn;
}

export function hsto(hs) {
    if (hsfrom() === []) {
        window.localStorage.setItem("highScoreRun", [hs]);
        return;
    }
    const newHighScores = hsfrom();
    newHighScores.push(hs);
    window.localStorage.setItem("highScoresRun", newHighScores);
}
