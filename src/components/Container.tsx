import * as React from "react";
import styled from "styled-components";

import { widths } from "../styles/variables";
import { getEmSize } from "../styles/mixins";

const StyledContainer = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: auto;
    max-width: ${getEmSize(widths.lg)}em;
`;

const Container: React.FC = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default Container;
