import isClient from "./isClient";

const storage = new Map();

const _setItem = <T>(key: string, value: T) => {
    if (isClient) {
        storage.set(key, value);
        window.localStorage.setItem(key, JSON.stringify(value));
    } else {
        storage.set(key, value);
    }
};

const _getItem = <T>(key: string): T | null => {
    if (isClient) {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value) as T;
        } else {
            return null;
        }
    } else {
        return storage.get(key) || null;
    }
};

export const setToLS = <T>(key: string, value: T) => {
    console.log("setting theme: ", key);
    _setItem<T>(key, value);
};

export const getFromLS = <T>(key: string): T | null => {
    return _getItem<T>(key);
};
