import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from '../utils/types/comments';
import { IUser } from '../utils/types/user'

interface commentSlice {
    comments: IComment[];
}

let user: IUser| any = {}

const initialState: commentSlice = {
    comments: [],
}

const LoggedInSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers : {
       updateCommnet: (state, action: PayloadAction<IComment[]>) => {
           state.comments = [...state.comments, ...action.payload];
       }
    }
});

export const { updateCommnet } = LoggedInSlice.actions;
export default LoggedInSlice.reducer; 