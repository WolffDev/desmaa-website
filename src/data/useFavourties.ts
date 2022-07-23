import { useEffect, useState } from "react";

export interface FavouriteItem {
    slug: string;
    title: string;
}

export const FAV_SONGS = "FAV_SONGS";
export const useFavourites = (defaultSlug: string) => {
    const [favItem, setFavItem] = useState<FavouriteItem | null>(null);

    useEffect(() => {
        const favItemObj = window?.localStorage?.getItem(FAV_SONGS);
        if (!favItemObj) {
            window?.localStorage?.setItem(FAV_SONGS, JSON.stringify({}));
        }
        if (favItemObj && defaultSlug) {
            const favItem = JSON.parse(favItemObj)[defaultSlug] as FavouriteItem;
            if (favItem) {
                setFavItem(favItem);
            }
        }
    }, []);

    const setFavourite = (slug: string, title: string) => {
        const favItemObj = JSON.parse(window?.localStorage?.getItem(FAV_SONGS) as string);
        favItemObj[slug] = { slug, title };
        window?.localStorage?.setItem(FAV_SONGS, JSON.stringify(favItemObj));
        setFavItem({ slug, title });
    };
    const deleteFavourite = (slug: string) => {
        const favItemObj = JSON.parse(window?.localStorage?.getItem(FAV_SONGS) as string);
        delete favItemObj[slug];
        window?.localStorage?.setItem(FAV_SONGS, JSON.stringify(favItemObj));
        setFavItem(null);
    };

    return { favouriteItem: favItem, setFavourite, deleteFavourite };
};
