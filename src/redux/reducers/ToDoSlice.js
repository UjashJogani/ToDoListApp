import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    toDoListData : []
}

const ToDoListSlice = createSlice({
    name: 'ToDoList',
    initialState,
    reducers: {
        setToDotListData: (state, action) => {
            state.toDoListData = action.payload;
        }
    }
});

export const setToDotListData = ToDoListSlice.actions.setToDotListData;

export const selectToDoList = (state) => state.ToDoListSlice.toDoListData;

export default ToDoListSlice.reducer;
