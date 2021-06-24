import {
    ADD_ITEM_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    addItemFailure,
    addItemSuccess,
    RESET_LIST
} from '../actions/handleToDoList';
import {put, takeEvery} from 'redux-saga/effects';

const initialObj = {
    loadingStatus: '' ,
    listItem: [],
    error: ''
}

const toDoList = (state =  initialObj, action) => {
    switch (action.type) {
        case ADD_ITEM_REQUEST:
            return {
                loadingStatus: true,
                listItem: state.listItem,
                error: ''
            };
        case ADD_ITEM_SUCCESS:
            return {
                loadingStatus: false,
                listItem: [...state.listItem, action.item],
                error: ''
            };
        case ADD_ITEM_FAILURE:
            return {
                loadingStatus: false,
                listItem: [],
                error: action.error
            };
        case RESET_LIST:
            return initialObj;
        default:
            return state;
    }
}
const addItemRequestError = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('error'));
        }, 500);
    });


const addItemRequestHandler = newItem =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(newItem);
        }, 500);
    });

function* addItemWorkerSaga({item}) {
    try {
        const response = yield addItemRequestHandler(item)
        // const response = yield addItemRequestError()
        yield put(addItemSuccess(response))
    } catch(error) {
        yield put(addItemFailure(error.message))
    }
}

export function* addItemWatcherSaga() {
    yield takeEvery(ADD_ITEM_REQUEST, addItemWorkerSaga)
}

export default toDoList;