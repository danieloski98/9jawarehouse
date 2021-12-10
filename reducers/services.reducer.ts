import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IServices } from '../utils/types/services';
import { IUser } from '../utils/types/user'

interface serviceSlice {
    services: IServices[];
}

let user: IUser| any = {}

const initialState: serviceSlice = {
    services: [],
}

const LoggedInSlice = createSlice({
    name: 'loggedInSlice',
    initialState,
    reducers : {
        setServices: (state, action: PayloadAction<IServices[]>) => {
            state.services = action.payload;
        },
    }
});

export const { setServices } = LoggedInSlice.actions;
export default LoggedInSlice.reducer; 