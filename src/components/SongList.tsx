import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

import SongCard from "./SongCard";
import SearchInput from './SearchInput';

const SongGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
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
        if (songName === '') return setFilteredSongs(initialSongs);
            const filteredArray = initialSongs.filter(song =>
            song.node.title.toLowerCase().includes(songName.toLowerCase())
        );
        setFilteredSongs(filteredArray);
    }

    return (
        <>
        <SearchInput handleSearch={handleSearch} />
        <SongGrid>
            {filteredSongs.map((song) => (
                <SongCard key={song.node.slug} song={song.node} />
            ))}
        </SongGrid>
        </>
    );
};

export default SongList;
