import { authLoginAction, authLoginRequest } from './auth';
import { types } from '../types/types';

describe('Tests authLoginRequest: ', () => {

    test('should return action types: AUTH Login Request', () => {
        const expectedAction = {type: types.authLoginRequest};
        const result = authLoginRequest();
        expect(result).toEqual(expectedAction);
    })

});

describe('Test authLoginAction', () => {

    describe('login api success', () => {

        const credentials = 'credentials';
        const action = authLoginAction(credentials);
        const dispatch = jest.fn();
        const getState = () => {};
        const api = {
            auth: {
                login: jest.fn().mockResolvedValue()
            }
        }
        const history = {
            location: {},
            replace: jest.fn()
        };

        test('Step 1: should dispatch 1 action type: AUTH Login Request', () => {
            const expectedAction = {type: types.authLoginRequest};
            action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        });

        test('Step 2: should call api.auth.login with credentials', () => {
            action(dispatch, getState, { api, history });
            expect(api.auth.login).toHaveBeenCalledWith(credentials);
        });

        /** after api call */
        test('Step 3: should dispatch 2 action type: AUTH Login Success', async () => {
            const expectedAction = {type: types.authLoginSuccess};
            await action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
        });

        test('Step 4: should call history.replace with from /', async () => {
            const from = { pathname: '/'};
            await action(dispatch, getState, { api, history });
            expect(history.replace).toHaveBeenCalledWith(from);
        });

    });

    describe('login api error', () => {

        const credentials = 'credentials';
        const action = authLoginAction(credentials);
        const dispatch = jest.fn();
        const getState = () => {};
        const error = 'Unauthorized';
        const api = {
            auth: {
                login: jest.fn()
            }
        }
        const history = {
            location: {},
            replace: jest.fn()
        };

        /** after api call */
        test('should dispatch 2 action type: AUTH Login Error', async () => {
            const expectedAction = {
                type: types.authLoginError,
                payload: error
            };
            api.auth.login.mockRejectedValue(error);
            await action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
        });
    });

});