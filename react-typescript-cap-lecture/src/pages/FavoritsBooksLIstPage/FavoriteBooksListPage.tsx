import React, {useEffect} from 'react';
import {BookDto} from "../../dto/book.dto";
import {List} from "@material-ui/core";
import {BookItem} from "../../components/BookItem";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export const FavoriteBooksPage = () => {
    const [booksList, setBooksList] = React.useState<BookDto[]>([]);
    const [checkedBoxes, setCheckedBoxes] = React.useState<number[]>([]);
    const classes = useStyles();

    const handleCheckboxToggle = (value: number) => {
        const currentIndex: number = checkedBoxes.indexOf(value);
        if (currentIndex === -1) {
            checkedBoxes.push(value);
        } else {
            checkedBoxes.splice(currentIndex, 1);
        }
        setCheckedBoxes([...checkedBoxes]);
    };

    useEffect(() => {
        const favoriteBooks: string | null = localStorage.getItem('favoriteBooks');
        if (favoriteBooks) {
            setBooksList(JSON.parse(favoriteBooks));
        }
    });

    return(
        <>
            <Typography variant="h5">
                Favorite books:
            </Typography>
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
        </>

    )
}

const useStyles = makeStyles(() => ({
    booksList: {
        maxHeight: '90vh',
        overflow: 'auto',
    }
}));