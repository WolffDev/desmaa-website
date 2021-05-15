import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import SongDetail from "./SongDetail";

const SongGrid = styled.div``;

interface SongEdge {
    node: {
        title: string;
        slug: string;
        description: string;
    };
}

interface SongListProps {
    edges: SongEdge[];
}

const SongList: React.FC<SongListProps> = ({ edges }) => {
    return (
        <>
            {edges.map((song) => (
                <SongDetail key={song.node.slug} song={song.node} />
            ))}
            ;
        </>
    );
};

export default SongList;
