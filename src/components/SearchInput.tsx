import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 350px;
    max-width: 100%;
    border: 1px solid var(--onBackground);
    border-radius: 10px;
    height: 40px;
    padding: 20px;
    text-align: center;
    font-size: 1.3em;
    margin-bottom: 15px;
`;

interface IProps {
    handleSearch: (search: string) => void;
}

const SearchInput: React.FC<IProps> = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        handleSearch(event.target.value);
    };

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    return (
        <Wrapper>
            <h2>Søg efter en sang</h2>
            <Input
                tabIndex={0}
                ref={inputRef}
                placeholder="Indtast navn på en sang"
                type="search"
                value={searchText}
                onChange={onChange}
            />
        </Wrapper>
    );
};

export default SearchInput;