import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    toDoListAPIData : []
}

const ToDOAPISlice = createSlice({
    name: 'ToDOAPISlice',
    initialState,
    reducers: {
        setToDoAPIListData: (state, action) => {
            state.toDoListAPIData = action.payload;
        }
    }
});

export const setToDoAPIListData = ToDOAPISlice.actions.setToDoAPIListData;

export const selectToDoApiList = (state) => state.ToDOAPISlice.toDoListAPIData;

export default ToDOAPISlice.reducer;
