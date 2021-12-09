import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../utils/types/user'

interface loggedSlice {
    loggedIn: boolean;
}

let user: IUser| any = {}

const initialState: loggedSlice = {
    loggedIn: false,
}

const LoggedInSlice = createSlice({
    name: 'loggedInSlice',
    initialState,
    reducers : {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        }
    }
});

export const { login, logout } = LoggedInSlice.actions;
export default LoggedInSlice.reducer; 