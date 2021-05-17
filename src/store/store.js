import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { advertsReducer } from './reducers/advertsReducer';


const reducers = combineReducers({
    auth: authReducer,
    adverts: advertsReducer
});

export const configureStore = ({ preloadedState }) => {
    return createStore(reducers, preloadedState, composeWithDevTools())
};
