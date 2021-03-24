import React from 'react';
import {BookSearchPage} from "./BookSearchPage/BooksSearchPage";
import {FavoriteBooksPage} from "./FavoritsBooksLIstPage/FavoriteBooksListPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {AppWrapper} from "./AppWrapper";
import {UiUrl} from "./utils/ui-url";


export const Root = () => {
    return(
        <BrowserRouter>
            <AppWrapper>
                <Switch>
                    <Route exact path={UiUrl.FAVORITE.url} component={FavoriteBooksPage}/>
                    <Route path={UiUrl.SEARCH.url} component={BookSearchPage}/>
                </Switch>
            </AppWrapper>
        </BrowserRouter>
    )
}