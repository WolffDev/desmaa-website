import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 228px;
    height: 70px;
    border-radius: 10px;
    text-decoration: none;
    background-color: var(--surface);
    color: var(--onSurface);
    padding: 6px 15px;

    &:hover,
    &:visited,
    &:active {
        text-decoration: none;
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
