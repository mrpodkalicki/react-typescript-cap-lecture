import {combineReducers} from 'redux';
import toDoList from './handleToDoList'

const rootReducer = combineReducers({
    toDoList
})

export default rootReducer;