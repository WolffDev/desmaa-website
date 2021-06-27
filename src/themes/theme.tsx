import React from 'react';
import { ThemeProvider } from "styled-components";

const theme = {};

const Theme: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

export default Theme;