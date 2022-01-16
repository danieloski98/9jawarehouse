import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware} from 'redux'
import UserReducer from '../reducers/User.reducer'
import LoggedInReducer from '../reducers/logged';
import TokenReducer from '../reducers/Token.reducer';
import CommentReducer from '../reducers/comment.reducer';
import ServicesReducer from '../reducers/services.reducer';
import ActiveUser from '../reducers/Activeuser.reducer'
import PinReducer from '../reducers/pin.reducer';
import SearchReduer from '../reducers/Search.reducer';
import ReduxThunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        UserReducer,
        LoggedInReducer,
        TokenReducer,
        CommentReducer,
        ServicesReducer,
        ActiveUser,
        PinReducer,
        SearchReduer,
    },
     middleware: (defaultMiddleware) => [...defaultMiddleware(), ReduxThunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;