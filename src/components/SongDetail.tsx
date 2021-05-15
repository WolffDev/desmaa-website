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

const SongDetail: React.FC<Song> = ({ song }) => {
    console.log({ song });
    return <>Song</>;
};

export default SongDetail;
