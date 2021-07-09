import React from "react";
// @ts-ignore
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import styled from "styled-components";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";

const Label = styled.label`
    background-color: #111;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    margin-right: 11px;
    position: relative;
    height: 26px;
    width: 50px;
    transform: scale(1.5);
`;

const Ball = styled.div`
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    height: 20px;
    width: 20px;
    transform: translateX(0px);
    transition: transform 0.2s linear;
`;

const Checkbox = styled.input`
    visibility: hidden;
    position: absolute;

    &:checked + ${Ball} {
        transform: translateX(24px);
    }
`;

const DarkToggle = () => {
    return (
        <ThemeToggler>
            {({ theme, toggleTheme }: { theme: string; toggleTheme: Function }) => (
                <>
                    <Label htmlFor="darkMode">
                        <Checkbox
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
                            id="darkMode"
                        />
                        <Ball />
                        <Moon />
                        <Sun />
                    </Label>
                    {/* <label>
                     <input
                //         type="checkbox"
                //         onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
                //         checked={theme === "dark"}
                //     />{" "}
                //     Dark mode
                // </label>
                 */}
                </>
            )}
        </ThemeToggler>
    );
};

export default DarkToggle;
