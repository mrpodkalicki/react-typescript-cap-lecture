import React, {FC, useContext, useState} from 'react';
import {List, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {getSearchBooksUrl} from "../utils/apiUrl";
import {BookSearchRespDto, BookSearchRespItemDto} from "../../dto/book-search-resp.dto";
import Typography from "@material-ui/core/Typography";
import {BookItem} from "../../components/BookItem";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import {BookDto} from "../../dto/book.dto";
import {AppSpinner, spinnerHide, spinnerShow} from "../../components/AppSpinner";
import {LocalStorageContext} from "../AppWrapper";

const saveBooksToLocalStorage = (listBooks: BookDto[], key: string) => {
    const favoriteBooks: string | null = localStorage.getItem('favoriteBooks');
    if (favoriteBooks) {
        localStorage.setItem(key, JSON.stringify(
            [...JSON.parse(favoriteBooks), ...listBooks])
        );
    } else {
        localStorage.setItem(key, JSON.stringify(listBooks));
    }
}

export const BookSearchPage: FC = () => {
    const favoriteBooksKeyLocalStorage = useContext<string>(LocalStorageContext);
    const classes = useStyles();
    const [isShowSpinner, setShowSpinner] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [booksList, setBooksList] = React.useState<BookSearchRespItemDto[]>([]);
    const [checkedBoxes, setCheckedBoxes] = React.useState<number[]>([]);

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchBtn = () => {
        spinnerShow(setShowSpinner);
        setCheckedBoxes([]);
        setBooksList([]);
        const url: string = getSearchBooksUrl(inputValue);
        if (url) {
            fetch(url)
                .then(res => res.json())
                .then(
                    (result: BookSearchRespDto) => {
                        setBooksList(result.items);
                        spinnerHide(setShowSpinner);
                    }
                );
        }
    }

    const handleCheckboxToggle = (value: number) => {
        const currentIndex: number = checkedBoxes.indexOf(value);
        if (currentIndex === -1) {
            checkedBoxes.push(value);
        } else {
            checkedBoxes.splice(currentIndex, 1);
        }
        setCheckedBoxes([...checkedBoxes]);
     };

    const handleSaveBtn = () => {
        spinnerShow(setShowSpinner);
        const listBooksToSave: BookDto[] = [];
        booksList.forEach((itemBooks: BookSearchRespItemDto, index: number) => {
            if (checkedBoxes.indexOf(index) !== -1) {
                listBooksToSave.push({
                    title: itemBooks.volumeInfo.title,
                    authors: (itemBooks.volumeInfo.authors ? itemBooks.volumeInfo.authors[0] : ''),
                    url: itemBooks.volumeInfo.infoLink
                })
            }
        });
        saveBooksToLocalStorage(listBooksToSave, favoriteBooksKeyLocalStorage);
        spinnerHide(setShowSpinner);
    };

    const getSaveBtn = (): JSX.Element | void => {
        if (checkedBoxes.length > 0) {
            return (
                <Button
                    onClick={handleSaveBtn}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    className={classes.saveBtn}
                >
                    Save
                </Button>
            )
        }
        return;
    }
    return (
        <>
            <Box display="flex" flexDirection="center" margin={'0 0 5rem 0'}>
                <TextField value={inputValue} onChange={handleInputValue} fullWidth={true} id="standard-search" label="Search field" type="search" />
                <Box padding="15px 0 0 40px">
                    <Button onClick={handleSearchBtn} type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Box>
            </Box>
            <Box >
                <Typography variant="h5">
                    Search results:
                </Typography>
            </Box>
            {
                isShowSpinner ?
                    <AppSpinner/>
                    :
                    <List className={classes.booksList} >
                        {booksList?.map((item: BookSearchRespItemDto, index: number) => {
                            return (
                                <BookItem key={index}
                                          id={index}
                                          title={item.volumeInfo.title}
                                          authors={item.volumeInfo.authors ? item.volumeInfo.authors[0] : ''}
                                          url={item.volumeInfo.infoLink}
                                          checkedBoxes={checkedBoxes}
                                          onClickCheckbox={handleCheckboxToggle}
                                />
                            )
                        })}
                    </List>
            }
            {getSaveBtn()}
        </>
    )
};

const useStyles = makeStyles(() => ({
    booksList: {
        maxHeight: '50vh',
        overflow: 'auto',
    },
    saveBtn: {
        marginTop: '2rem'
    }
}));
