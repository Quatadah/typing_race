import texts from "./texts.json";

// TODO : Quote generator => Learn to type fast + learn quotes

export default function getText() {
    const len = texts.length;
    return texts[Math.floor(Math.random() * len)].text;
}
