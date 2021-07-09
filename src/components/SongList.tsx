import React, { useState } from "react";
import styled from "styled-components";
import ScrollToTop from "react-scroll-to-top";

import SongCard from "./SongCard";
import SearchInput from "./SearchInput";
import ArrowUp from "./icons/ArrowUp";

const SongGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

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
    const [initialSongs] = useState(edges);
    const [filteredSongs, setFilteredSongs] = useState(initialSongs);

    const handleSearch = (songName: string) => {
        if (songName === "") return setFilteredSongs(initialSongs);
        const filteredArray = initialSongs.filter((song) =>
            song.node.title.toLowerCase().includes(songName.toLowerCase())
        );
        setFilteredSongs(filteredArray);
    };

    return (
        <>
            <SearchInput handleSearch={handleSearch} />
            <ScrollToTop
                top={200}
                smooth
                style={{
                    background: "var(--uiDescent)",
                    boxShadow: "var(--shadowsPrimary)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    right: "20px",
                    bottom: "20px",
                }}
                component={<ArrowUp />}
            />
            <SongGrid>
                {filteredSongs.map((song) => (
                    <SongCard key={song.node.slug} song={song.node} />
                ))}
            </SongGrid>
        </>
    );
};

export default SongList;
