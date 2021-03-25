import React, {useState} from 'react';
import {List, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {getSearchBooksUrl} from "../utils/api-url";
import {BookSearchRespDto, BookSearchRespItemDto} from "../../dto/book-search-resp.dto";

export const BookSearchPage = () => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const submitHandler = () => {
        const url: string = getSearchBooksUrl(inputValue);
        fetch(url)
            .then(res => res.json())
            .then(
                (result: BookSearchRespDto) => {
                    setBooksLIst(result.items);
                }
            );
    }

    const [inputValue, setInputValue] = useState<string>('');
    const [booksList, setBooksLIst] = useState<BookSearchRespItemDto[]>([]);

    return(
        <>
            <Box display="flex" flexDirection="center">
                <TextField value={inputValue} onChange={handleChange} fullWidth={true} id="standard-search" label="Search field" type="search" />
                <Box padding="15px 0 0 40px">
                    <Button onClick={submitHandler} type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Box>
        </Box>
        <List>
            { booksList.map((item: BookSearchRespItemDto, index: number) => {
                return (
                    <li key={index}>{index}: {item.volumeInfo.title}</li>
                )
            })}
        </List>
        </>
    )
};