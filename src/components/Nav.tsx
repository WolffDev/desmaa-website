import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import { heights, dimensions, widths } from "../styles/variables";
import DarkToggle from "./DarkToggle";
import HeartSolid from "./icons/heartSolid";

const StyledHeader = styled.header`
    height: ${heights.header}px;
    padding: 0 ${dimensions.containerPadding}rem;
    background-color: var(--surface);
    color: var(--onSurface);
    display: flex;
    justify-content: center;
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
    justify-content: space-between;
    height: 100%;
    width: ${widths.xl}px;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > a {
        padding-right: 30px;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    color: var(--onSurface);
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
            <StyledLink to="/">{title}</StyledLink>
            <HeaderRight>
                <StyledLink to="/favorit">
                    <HeartSolid />
                </StyledLink>
                <DarkToggle />
            </HeaderRight>
        </HeaderInner>
    </StyledHeader>
);

export default Header;
