import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = combineReducers({
    auth: authReducer
});

export const configureStore = ({ preloadedState }) => {
    return createStore(reducers, preloadedState, composeWithDevTools())
};
