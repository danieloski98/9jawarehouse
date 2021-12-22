import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../utils/types/user'

interface pinSlice {
    pin: number | null;
}

const initialState: pinSlice = {
    pin: null,
}

const PinSlice = createSlice({
    name: 'PinSlice',
    initialState,
    reducers : {
        updatePin: (state, action: PayloadAction<number>) => {
            state.pin = action.payload;
        }
    }
});

export const { updatePin } = PinSlice.actions;
export default PinSlice.reducer; 