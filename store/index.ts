import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../reducers/User.reducer'
import LoggedInReducer from '../reducers/logged';
import TokenReducer from '../reducers/Token.reducer';
import CommentReducer from '../reducers/comment.reducer';
import ServicesReducer from '../reducers/services.reducer';
import ActiveUser from '../reducers/Activeuser.reducer'

export const store = configureStore({
    reducer: {
        UserReducer,
        LoggedInReducer,
        TokenReducer,
        CommentReducer,
        ServicesReducer,
        ActiveUser,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;