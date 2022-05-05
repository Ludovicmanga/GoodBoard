import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogState {
    value: string;
}

const initialState: LogState = {
    value: ''
};

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        logged(state: any) {
            state.value = 'logged';
        }
    }
})

export const { logged } = logSlice.actions;
export default logSlice.reducer;