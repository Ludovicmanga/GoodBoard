import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogState {
    value: string;
}

const initialState: LogState = {
    value: ''
};

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        getUser(state: any) {
            state.value = 'logged';
        }
    }
})

export const { getUser } = UserSlice.actions;
export default UserSlice.reducer;