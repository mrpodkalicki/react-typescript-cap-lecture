import React, {FC, useState} from 'react';
import {List, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {getSearchBooksUrl} from "../utils/api-url";
import {BookSearchRespDto, BookSearchRespItemDto} from "../../dto/book-search-resp.dto";
import Typography from "@material-ui/core/Typography";
import {BookItem} from "../../components/BookItem";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import {BookDto} from "../../dto/book.dto";


const saveBooksToLocalStorage = (listBooks: BookDto[]) => {
    const favoriteBooks: string | null = localStorage.getItem('favoriteBooks');
    if (favoriteBooks) {
        localStorage.setItem('favoriteBooks', JSON.stringify(
            [...JSON.parse(favoriteBooks), ...listBooks])
        );
    } else {
        localStorage.setItem('favoriteBooks', JSON.stringify(listBooks));
    }
}

export const BookSearchPage: FC = () => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<string>('');
    const [booksList, setBooksList] = React.useState<BookSearchRespItemDto[]>([]);
    const [checkedBoxes, setCheckedBoxes] = React.useState<number[]>([]);

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearchSubmit = () => {
        setCheckedBoxes([]);
        setBooksList([]);
        const url: string = getSearchBooksUrl(inputValue);
        fetch(url)
            .then(res => res.json())
            .then(
                (result: BookSearchRespDto) => {
                    setBooksList(result.items);
                }
            );
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

    const handleSaveSubmit = () => {
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
        saveBooksToLocalStorage(listBooksToSave);
    };

    const getSaveBtn = (): JSX.Element | void => {
        if (booksList.length > 0) {
            return (
                <Button
                    onClick={handleSaveSubmit}
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

    return(
        <>
            <Box display="flex" flexDirection="center" margin={'0 0 5rem 0'}>
                <TextField value={inputValue} onChange={handlerInputChange} fullWidth={true} id="standard-search" label="Search field" type="search" />
                <Box padding="15px 0 0 40px">
                    <Button onClick={handleSearchSubmit} type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Box>
        </Box>
        <Box >
            <Typography variant="h5">
                Search results:
            </Typography>
        </Box>
        <List className={classes.booksList} >
            {booksList.map((item: BookSearchRespItemDto, index: number) => {
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
