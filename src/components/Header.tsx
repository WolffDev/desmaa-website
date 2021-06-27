import * as React from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { Link } from "gatsby";

import { heights, dimensions, colors } from "../styles/variables";

const StyledHeader = styled.header`
    height: ${heights.header}px;
    padding: 0 ${dimensions.containerPadding}rem;
    background-color: ${colors.brand};
    color: ${transparentize(0.5, colors.white)};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
`;

const HeaderInner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
`;

const HomepageLink = styled(Link)`
    color: ${colors.white};
    font-size: 1.5rem;
    font-weight: 600;

    &:hover,
    &:focus {
        text-decoration: none;
    }
`;

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <StyledHeader>
        <HeaderInner>
            <HomepageLink to="/">{title}</HomepageLink>
        </HeaderInner>
    </StyledHeader>
);

export default Header;
