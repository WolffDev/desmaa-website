import React from "react";
import styled from "styled-components";
import { useFavourites } from "../data/useFavourties";
import HeartRegular from "./icons/heartRegular";
import HeartSolid from "./icons/heartSolid";

interface Props {
    slug: string;
    title: string;
}

const FavWrapper = styled.div`
    display: flex;
    align-items: center;

    & > span {
        padding-right: 10px;
    }

    &:hover {
        cursor: pointer;
    }
`;

const AddToFavourite: React.FC<Props> = ({ slug, title }) => {
    const { favouriteItem, deleteFavourite, setFavourite } = useFavourites(slug);
    const handleClick = () => {
        favouriteItem ? deleteFavourite(slug) : setFavourite(slug, title);
    };
    console.log("add fav");
    return (
        <FavWrapper onClick={handleClick}>
            {favouriteItem ? (
                <>
                    <span>
                        <HeartSolid />
                    </span>
                    Tryk her for at fjerne fra favoritlisten{" "}
                </>
            ) : (
                <>
                    <span>
                        <HeartRegular />
                    </span>
                    Tryk her for at tilføje til favoritlisten{" "}
                </>
            )}
        </FavWrapper>
    );
};

export default AddToFavourite;
