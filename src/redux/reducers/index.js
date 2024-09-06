import { combineReducers } from 'redux';
import ToDoListSlice from './ToDoSlice';
import ToDOAPISlice from './ToDOAPISlice';

const appReducer = combineReducers({ ToDOAPISlice, ToDoListSlice })

const rootReducer = (state, actions) => { return appReducer(state, actions); }

export default rootReducer;
