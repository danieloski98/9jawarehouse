import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IComment } from '../utils/types/comments';
import { IUser } from '../utils/types/user'

interface searchSlice {
    service: string;
    state: string;
    lga?: string;
}

let user: IUser| any = {}

const initialState: searchSlice = {
   service: '',
   state: '',
   lga: '',
}

const SearchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers : {
        setService : (state, action: PayloadAction<string>) => {
            state.service = action.payload;
        },
        setState : (state, action: PayloadAction<string>) => {
            state.state = action.payload;
        },
        setLga : (state, action: PayloadAction<string>) => {
            state.lga = action.payload;
        }
    }
});

export const { setService, setState, setLga } = SearchSlice.actions;
export default SearchSlice.reducer; 