import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from './reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { advertsReducer } from './reducers/advertsReducer';
import { uiReducer } from './reducers/uiReducer';
import { tagsReducer } from './reducers/tagsReducer';
import thunk from 'redux-thunk';
import * as api from '../api';


const reducers = combineReducers({
    auth: authReducer,
    adverts: advertsReducer,
    tags: tagsReducer,
    ui: uiReducer
});


export const configureStore = ({ preloadedState, history }) => {
    const middlewares = [thunk.withExtraArgument({ api, history })];
    return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
};
