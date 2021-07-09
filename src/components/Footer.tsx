import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
    width: 100%;
    background-color: var(--surface);
    color: var(--onSurface);
    height: 150px;
`;

const Footer: React.FC = () => {
    return <FooterWrapper></FooterWrapper>;
};

export default Footer;
