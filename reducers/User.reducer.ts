import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../utils/types/user'

interface userSlice {
    user: IUser;
}

let user: IUser| any = {}

const initialState: userSlice = {
    user: user,
}

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers : {
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = {...state, ...action.payload}
        }
    }
});

export const { updateUser } = UserSlice.actions;
export default UserSlice.reducer; 