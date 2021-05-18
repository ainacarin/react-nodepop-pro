import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from './reducers/authReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { advertsReducer } from './reducers/advertsReducer';
import { uiReducer } from './reducers/uiReducer';
import thunk from 'redux-thunk';


const reducers = combineReducers({
    auth: authReducer,
    adverts: advertsReducer,
    ui: uiReducer
});


export const configureStore = ({ preloadedState, history }) => {
    const middlewares = [thunk.withExtraArgument({history})];
    return createStore(reducers, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
};
