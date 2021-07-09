import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { getEmSize } from "../styles/mixins";
import { breakpoints } from "../styles/variables";

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 70px;
    border-radius: 10px;
    text-decoration: none;
    background-color: var(--surface);
    color: var(--onSurface);
    padding: 6px 15px;
    margin: 5px;

    &:hover,
    &:visited,
    &:active {
        text-decoration: none;
    }

    @media (min-width: ${getEmSize(breakpoints.sm)}em) {
        width: 228px;
    }
`;

const Card = styled.div``;

interface Song {
    song: {
        title: string;
        slug: string;
        description: string;
    };
}

const SongCard: React.FC<Song> = ({ song }) => {
    return <StyledLink to={`sange/${song.slug}`}>{song.title}</StyledLink>;
};

export default SongCard;
