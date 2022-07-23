import React from "react";
import { useFavourites } from "../data/useFavourties";

interface Props {
    slug: string;
    title: string;
}
const AddToFavourite: React.FC<Props> = ({ slug, title }) => {
    const { favouriteItem, deleteFavourite, setFavourite } = useFavourites(slug);
    const handleClick = () => {
        favouriteItem ? deleteFavourite(slug) : setFavourite(slug, title);
    };
    console.log("add fav");
    return <button onClick={handleClick}>{favouriteItem ? "SLET MIG" : "TILFØJ"}</button>;
};

export default AddToFavourite;
