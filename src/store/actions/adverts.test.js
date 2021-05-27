import { types } from '../types/types';
import { advertsLoadedSuccess } from './adverts';

describe('Test advertsLoadedSuccess: ', () => {

    test('should return action types: ADVERTS Loaded Success y payload: [adverts]', () => {
        const adverts = 'adverts';
        const expectedAction = { type: types.advertsLoadedSuccess, payload: adverts };
        const result = advertsLoadedSuccess(adverts);
        expect(result).toEqual(expectedAction);
    })

});

