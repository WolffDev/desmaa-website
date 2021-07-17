import React from "react";
import styled from "styled-components";

import { widths } from "../styles/variables";

const StyledContainer = styled.div`
    position: relative;
    padding-top: 90px;
    margin-left: auto;
    margin-right: auto;
    width: auto;
    max-width: ${widths.xl}px;
`;

const Container: React.FC = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default Container;
