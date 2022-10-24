import texts from "./texts.json";

// TODO : Quote generator => Learn to type fast + learn quotes

export default function getText(language) {
    const len = texts[language].length;
    return texts[language][Math.floor(Math.random() * len)].text;
}
