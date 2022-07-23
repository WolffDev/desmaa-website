import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import Page from "../components/Page";
import SongCard from "../components/SongCard";
import { FavouriteItem, FAV_SONGS } from "../data/useFavourties";
import IndexLayout from "../layouts/IndexLayout";

const SongGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const FavoritePage = () => {
    const [favList, setFavList] = useState<FavouriteItem[] | []>([]);
    useEffect(() => {
        const list = window?.localStorage?.getItem(FAV_SONGS);
        if (list) {
            setFavList(Object.values(JSON.parse(list)));
        }
    }, [setFavList]);

    return (
        <IndexLayout>
            <Page>
                <Container>
                    <h1>Favorit side</h1>
                    <SongGrid>
                        {favList ? (
                            favList.map((favItem) => <SongCard key={favItem.slug} song={favItem} />)
                        ) : (
                            <p>Du har ikke tilføjet nogen sange til din favoritliste endnu.</p>
                        )}
                    </SongGrid>
                </Container>
            </Page>
        </IndexLayout>
    );
};
export default FavoritePage;
