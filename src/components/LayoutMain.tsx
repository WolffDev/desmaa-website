import * as React from "react";
import styled from "styled-components";

const StyledLayoutMain = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const LayoutMain: React.FC = ({ children }) => <StyledLayoutMain>{children}</StyledLayoutMain>;

export default LayoutMain;
