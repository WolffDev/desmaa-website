import React from "react";

import GlobalStyles from "./GlobalStyles";

const App: React.FC = ({ children }) => {
    console.log("APP");
    return (
        <>
            <GlobalStyles />
            {children}
        </>
    );
};

export default App;