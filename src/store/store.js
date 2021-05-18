import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { advertsReducer } from './reducers/advertsReducer';
import { uiReducer } from './reducers/uiReducer';


const reducers = combineReducers({
    auth: authReducer,
    adverts: advertsReducer,
    ui: uiReducer
});

export const configureStore = ({ preloadedState }) => {
    return createStore(reducers, preloadedState, composeWithDevTools())
};
