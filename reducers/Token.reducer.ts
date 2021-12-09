import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../utils/types/user'

interface tokenSlice {
    token: string;
}

let user: IUser| any = {}

const initialState: tokenSlice = {
    token: '',
}

const TokenSlice = createSlice({
    name: 'TokenSlice',
    initialState,
    reducers : {
        updatetoken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
});

export const { updatetoken } = TokenSlice.actions;
export default TokenSlice.reducer; 