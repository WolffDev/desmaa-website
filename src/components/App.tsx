import React from "react";

import GlobalStyles from "./Globalstyles";

const App: React.FC = ({ children }) => {
    return (
        <>
            <GlobalStyles />
            {children}
        </>
    );
};

export default App;
