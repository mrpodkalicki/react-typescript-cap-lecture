const SEARCH_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?';

export const getSearchBooksUrl = (inputValue: string) => {
    return SEARCH_BOOKS_API + `q=${inputValue}&printType=books&projection=lite&startIndex=0&maxResults=21&`+ process.env.REACT_APP_SEARCH_BOOKS_API_KEY;
};
