import * as React from "react";
import GlobalStyle from "../styles/globalstyle";

const LayoutRoot: React.FC = ({ children }) => (
    <>
        <GlobalStyle />
        <>{children}</>
    </>
);

export default LayoutRoot;
