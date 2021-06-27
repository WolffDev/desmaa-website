import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;

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
