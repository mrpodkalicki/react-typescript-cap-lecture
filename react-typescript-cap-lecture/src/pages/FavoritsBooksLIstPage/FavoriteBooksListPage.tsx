import React, {useContext, useEffect, useState} from 'react';
import {BookDto} from "../../dto/book.dto";
import {List} from "@material-ui/core";
import {BookItem} from "../../components/BookItem";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import {AppSpinner, spinnerHide, spinnerShow} from "../../components/AppSpinner";
import {LocalStorageContext} from "../AppWrapper";

export const FavoriteBooksPage = () => {
    const favoriteBooksKeyLocalStorage = useContext<string>(LocalStorageContext);
    const [isShowSpinner, setShowSpinner] = useState<number>(0);
    const [refreshList, setRefreshList] = React.useState<[]>([]);
    const [booksList, setBooksList] = React.useState<BookDto[]>([]);
    const [checkedBoxes, setCheckedBoxes] = React.useState<number[]>([]);
    const classes = useStyles();

    useEffect(() => {
        spinnerShow(setShowSpinner)
        const favoriteBooks: string | null = localStorage.getItem('favoriteBooks');
        if (favoriteBooks) {
            setBooksList(JSON.parse(favoriteBooks));
        }
        spinnerHide(setShowSpinner)
        setCheckedBoxes([]);
    },[refreshList]);

    const handleCheckboxToggle = (value: number) => {
        const currentIndex: number = checkedBoxes.indexOf(value);
        if (currentIndex === -1) {
            checkedBoxes.push(value);
        } else {
            checkedBoxes.splice(currentIndex, 1);
        }
        setCheckedBoxes([...checkedBoxes]);
    };

    const handleDeleteBtn= () => {
        const listBooksToSave: BookDto[] = [];
        booksList.forEach((itemBooks: BookDto, index: number) => {
            if (checkedBoxes.indexOf(index) === -1) {
                listBooksToSave.push(itemBooks)
            }
        });
        localStorage.setItem(favoriteBooksKeyLocalStorage, JSON.stringify(listBooksToSave));
        setRefreshList([])
    }

    const getDeleteBtn = (): JSX.Element | void => {
        if (checkedBoxes.length > 0) {
            return (
                <Button
                    onClick={handleDeleteBtn}
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<DeleteIcon />}
                    className={classes.saveBtn}
                >
                    Delete
                </Button>
            )
        }
        return;
    }
    return(
        <>
            <Typography variant="h5">
                Favorite books:
            </Typography>
            {
                isShowSpinner ?
                    <AppSpinner/>
                    :
                    <List className={classes.booksList} >
                        {booksList.map((item: BookDto, index: number) => {
                            return (
                                <BookItem key={index}
                                          id={index}
                                          title={item.title}
                                          authors={item.authors ? item.authors[0] : ''}
                                          url={item.url}
                                          checkedBoxes={checkedBoxes}
                                          onClickCheckbox={handleCheckboxToggle}
                                />
                            )
                        })}
                    </List>
            }
            {getDeleteBtn()}
        </>
    )
}

const useStyles = makeStyles(() => ({
    booksList: {
        maxHeight: '90vh',
        overflow: 'auto',
    },
    saveBtn: {
        marginTop: '2rem'
    }
}));