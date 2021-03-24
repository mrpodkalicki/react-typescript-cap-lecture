import React from 'react';
import {BookSearchPage} from "./BookSearchPage/BooksSearchPage";
import {FavoriteBooksPage} from "./FavoritsBooksLIstPage/FavoriteBooksListPage";
import {BrowserRouter, Switch, Route} from "react-router-dom";

export const Root = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={FavoriteBooksPage}/>
                <Route path='/search' component={BookSearchPage}/>
            </Switch>
        </BrowserRouter>
    )
}
