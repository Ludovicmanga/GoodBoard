import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    value: object;
}

const initialState: userState = {
    value: {}
};

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        getUser(state: any) {
            return state;
        }
    }
})

export const { getUser } = UserSlice.actions;
export default UserSlice.reducer;