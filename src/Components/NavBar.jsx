import React from "react";

const NavBar = ({ language, setLanguage }) => {
    return (
        <nav className="my-navbar">
            <select
                className=""
                defaultValue={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Arabic">Arabic</option>
            </select>
        </nav>
    );
};

export default NavBar;
