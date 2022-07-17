import { Component } from "react";
import "./App.css";

class App extends Component {
    state = {
        word: "",
        text: [
            "lorem",
            "ipsum",
            "dolor",
            "sit",
            "amet,",
            "consectetur",
            "adipiscing",
            "elit.",
            "Nullam",
            "euismod,",
            "nisi",
            "vel",
            "consectetur",
            "convallis,",
            "nisl",
            "nisi",
            "consectetur",
            "nisi,",
            "eget",
            "egestas",
            "nisl",
            "nisi",
            "eget",
            "nisi.",
        ],
        currentWord: 0,
        isStateOk: true,
        score: 0,
        hasEnded: false,
    };

    handleChange = (event) => {
        const word = event.target.value;
        if (word.endsWith(" ")) {
            if (word.trim() !== this.state.text[this.state.currentWord]) {
                this.setState({ isStateOk: false });
            } else {
                this.setState({ isStateOk: true });
                this.setState({ score: this.state.score + 1 });
                this.setState({ word: "" });
                this.setState({ currentWord: this.state.currentWord + 1 });
            }
        } else {
            this.setState({ word });
        }
    };

    render() {
        return (
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="bordering mt-5 pt-2">
                        <div className="d-flex align-items-center">
                            <h1 className="fw-bold me-5">Race me</h1>
                            <div className="timer ms-5">00:00</div>
                        </div>
                        <p className="display-text p-3 text-center">
                            {this.state.text.map((word, i) => (
                                <span
                                    className={
                                        this.state.currentWord === i
                                            ? "fw-bold text-dark"
                                            : "fw-normal"
                                    }>
                                    {" "}
                                    {word}{" "}
                                </span>
                            ))}
                        </p>
                        <input
                            onChange={(event) => this.handleChange(event)}
                            type="text"
                            value={this.state.word}
                            className="form-control mb-4"
                        />
                        <div
                            className={`
                                ${
                                    this.state.isStateOk
                                        ? "text-success"
                                        : "text-danger"
                                }
                                text-center fw-bold`}>
                            {this.state.isStateOk
                                ? "Good job so far!"
                                : "Error somewhere!"}
                        </div>
                        <div className="score mt-3">
                            <p className="text-center fw-bold">
                                Score: {this.state.score}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
