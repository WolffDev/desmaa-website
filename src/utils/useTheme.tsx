import { useEffect, useState } from "react";
import { setToLS, getFromLS } from "./storage";
import _ from "lodash";
import { DefaultTheme } from "styled-components";
import { IThemes, themes } from "../styles/themes";

export const useTheme = () => {
    setToLS<IThemes>("all-themes", themes);

    const _themes = getFromLS<IThemes>("all-themes");
    const [theme, setTheme] = useState(themes.data.light);
    const [themeLoaded, setThemeLoaded] = useState(theme ? true : false);

    const setMode = (mode: DefaultTheme) => {
        setToLS<DefaultTheme>("theme", mode);
        setTheme(mode);
    };

    const getFonts = () => {
        const allFonts = _.values(_.mapValues(_themes!.data, "font"));
        return allFonts;
    };

    useEffect(() => {
        const localTheme = getFromLS<DefaultTheme>("theme");
        localTheme ? setTheme(localTheme) : setTheme(_themes!.data.light);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode, getFonts };
};
