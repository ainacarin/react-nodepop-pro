import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(reducers, composeWithDevTools());