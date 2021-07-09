import * as React from "react";
import styled from "styled-components";

import { dimensions } from "../styles/variables";

const StyledPage = styled.div`
    display: block;
    flex: 1;
    position: relative;
    padding: 0 ${dimensions.containerPadding}rem ${dimensions.containerPadding}rem;
    margin-top: 60px;
    margin-bottom: 3rem;
`;

const Page: React.FC = ({ children }) => <StyledPage>{children}</StyledPage>;

export default Page;
