import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../utils/types/user'

interface activeuserSlice {
    user: IUser;
}

let user: IUser| any = {}

const initialState: activeuserSlice = {
    user: user,
}

const ActiveUserSlice = createSlice({
    name: 'ActiveUserSlice',
    initialState,
    reducers : {
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = {...action.payload}
        }
    }
});

export const { updateUser } = ActiveUserSlice.actions;
export default ActiveUserSlice.reducer; 