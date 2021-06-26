import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const SongGrid = styled.div``;

interface Song {
    song: {
        title: string;
        slug: string;
        description: string;
    };
}

const SongCard: React.FC<Song> = ({ song }) => {
    return <Link to={`sange/${song.slug}`}>{song.title}</Link>;
};

export default SongCard;
