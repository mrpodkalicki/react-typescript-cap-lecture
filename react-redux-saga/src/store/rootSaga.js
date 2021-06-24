import {all} from 'redux-saga/effects';
import {addItemWatcherSaga} from '../store/handleToDoList'

export function* rootSaga() {
    yield all([addItemWatcherSaga()]);
}