import React from "react";
// @ts-ignore
import { ThemeToggler } from "gatsby-plugin-dark-mode";

const DarkToggle = () => {
    return (
        <ThemeToggler>
            {({ theme, toggleTheme }: { theme: string; toggleTheme: Function }) => (
                <label>
                    <input
                        type="checkbox"
                        onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
                        checked={theme === "dark"}
                    />{" "}
                    Dark mode
                </label>
            )}
        </ThemeToggler>
    );
};

export default DarkToggle;
