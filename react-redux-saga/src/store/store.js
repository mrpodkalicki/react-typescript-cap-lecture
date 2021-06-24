import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        composeWithDevTools()
    )
);

sagaMiddleware.run(rootSaga);