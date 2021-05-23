import { types } from '../types/types';
import { advertsReducer } from './advertsReducer';

const initialState = {
    loaded: false,
    data: []
};

describe('Test advertsReducer: ', () => {

    test('should manage any action return default state', () => {
        const state = initialState;
        const action = 'ADVERTS Default Action';
        const nextState = advertsReducer(state, action);
        expect(nextState).toBe(state);
    });

    test('should manage ADVERTS Loaded Success action', () => {
        const state = initialState;
        const payload = [];
        const action = {
            type: types.advertsLoadedSuccess,
            payload: payload
        };
        const expectedState = {
            ...initialState,
            loaded: true,
            data: payload,
          };
        const nextState = advertsReducer(state, action);
        expect(nextState).toStrictEqual(expectedState);
    });

    test('should manage ADVERT Detail Success action', () => {
        const state = initialState;
        const payload = {};
        const action = {
            type: types.advertDetailSuccess,
            payload: payload
        };
        const expectedState = {
            ...initialState,
            loaded: false,
            data: [...initialState.data, payload]
          };
        const nextState = advertsReducer(state, action);
        expect(nextState).toStrictEqual(expectedState);
    });

});