import { DefaultTheme } from "styled-components";

import lightBackground from "../images/lightBackground.png";
import darkBackground from "../images/darkBackground.png";

declare module "styled-components" {
    export interface DefaultTheme {
        id: string;
        name: string;
        colors: {
            body: string;
            text: string;
            button: {
                text: string;
                background: string;
            };
            link: {
                text: string;
                opacity: number;
            };
        };
        background: {
            image: string;
        };
        font: string;
    }
}

const lightTheme: DefaultTheme = {
    id: "LIGHT_01",
    name: "Lys Tema",
    colors: {
        body: "#FFFFFF",
        text: "#000000",
        button: {
            text: "#FFFFFF",
            background: "#000000",
        },
        link: {
            text: "teal",
            opacity: 1,
        },
    },
    background: {
        image: `${lightBackground}`,
    },
    font: "Tinos",
};

const darkTheme: DefaultTheme = {
    id: "DARK_01",
    name: "Mørk Tema",
    colors: {
        body: "#9be7ff",
        text: "#0d47a1",
        button: {
            text: "#ffffff",
            background: "#0d47a1",
        },
        link: {
            text: "#0d47a1",
            opacity: 0.8,
        },
    },
    background: {
        image: `${darkBackground}`,
    },
    font: "Ubuntu",
};

export const themes = { data: { light: { ...lightTheme }, dark: { ...darkTheme } } };

export type IThemes = typeof themes;
