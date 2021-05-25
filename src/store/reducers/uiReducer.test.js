import { types } from '../types/types';
import { uiReducer } from './uiReducer';

const initialState = {
    loading: false,
    error: null,
  };

describe('Test uiReducer: case Advert Detail', () => {

    test('should manage any action return default state', () => {
        const state = initialState;
        const action = 'ADVERT Default Action';
        const nextState = uiReducer(state, action);
        expect(nextState).toBe(state);
    });

    test('should manage Advert Detail Request action', () => {
        const state = initialState;
        const action = {
            type: types.advertDetailRequest
        };
        const expectedState = {
            ...initialState,
            loading: true,
            error: null,
          };
        const nextState = uiReducer(state, action);
        expect(nextState).toStrictEqual(expectedState);
    });

    test('should manage ADVERT Detail Success action', () => {
        const state = initialState;
        const payload = {};
        const action = {
            type: types.advertDetailSuccess
        };
        const expectedState = {
            ...initialState,
            loading: false,
            error: null
          };
        const nextState = uiReducer(state, action);
        expect(nextState).toStrictEqual(expectedState);
    });

    test('should manage ADVERT Detail Error action', () => {
        const state = initialState;
        const payload = 'Message error';
        const action = {
            type: types.advertDetailError,
            payload
        };
        const expectedState = {
            ...initialState,
            loading: false,
            error: payload
          };
        const nextState = uiReducer(state, action);
        expect(nextState).toStrictEqual(expectedState);
    });

});