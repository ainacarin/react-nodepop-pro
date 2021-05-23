import { authLoginRequest } from './auth';
import { types } from '../types/types';

describe('Tests authLoginRequest: ', () => {

    test('should return action types: AUTH Login Request', () => {
        const expectedAction = {type: types.authLoginRequest};
        const result = authLoginRequest();
        expect(result).toEqual(expectedAction);
    })

});