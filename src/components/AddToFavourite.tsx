import React from "react";
<<<<<<< HEAD
import { useFavourites } from "../data/useFavourties";
=======
import styled from "styled-components";
import { useFavourites } from "../data/useFavourties";
import HeartRegular from "./icons/heartRegular";
import HeartSolid from "./icons/heartSolid";
>>>>>>> 7c795115f98cf9d66220661396cc4b8309be92f1

interface Props {
    slug: string;
    title: string;
}
<<<<<<< HEAD
=======

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

>>>>>>> 7c795115f98cf9d66220661396cc4b8309be92f1
const AddToFavourite: React.FC<Props> = ({ slug, title }) => {
    const { favouriteItem, deleteFavourite, setFavourite } = useFavourites(slug);
    const handleClick = () => {
        favouriteItem ? deleteFavourite(slug) : setFavourite(slug, title);
    };
    console.log("add fav");
<<<<<<< HEAD
    return <button onClick={handleClick}>{favouriteItem ? "SLET MIG" : "TILFØJ"}</button>;
=======
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
>>>>>>> 7c795115f98cf9d66220661396cc4b8309be92f1
};

export default AddToFavourite;
