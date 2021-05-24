import { types } from "../types/types";
import { tagsLoadAction, tagsLoadedRequest, tagsLoadedSuccess } from "./tags";

describe("Test tagsLoadedRequest: ", () => {
  test("should return action types: TAGS Loaded Request", () => {
    const expectedAction = { type: types.tagsLoadedRequest };
    const result = tagsLoadedRequest();
    expect(result).toEqual(expectedAction);
  });
});

describe("Test tagsLoadedSuccess: ", () => {
  test("should return action types: TAGS Loaded Success y payload: [tags]", () => {
    const tags = "tags";
    const expectedAction = { type: types.tagsLoadedSuccess, payload: tags };
    const result = tagsLoadedSuccess(tags);
    expect(result).toEqual(expectedAction);
  });
});

describe("Test tagsLoadAction", () => {
  describe("store with tags ; not api call", () => {
    const action = tagsLoadAction();
    const dispatch = jest.fn();
    const state = {
        tags: {
            loaded: false
        }
    };
    const getState = () => state;
    const api = {
      adverts: {
        getTags: jest.fn().mockResolvedValue(),
      },
    };

    test("Step 1: should return, no request api", () => {
      const state = {
        tags: {
          loaded: true,
        },
      };
      const getState = () => state;
      action(dispatch, getState, { api });
      expect(dispatch).not.toHaveBeenCalled();
    });

    test("Step 2: should dispatch 1 TAGS Loaded Request", () => {
      const expectedAction = { type: types.tagsLoadedRequest };
      action(dispatch, getState, { api });
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
    });

    test("Step 3: should call api.adverts.getTags", () => {
      action(dispatch, getState, { api });
      expect(api.adverts.getTags).toHaveBeenCalled();
    });

    /** after api call */
    test("Step 4: should dispatch 2 action type: TAGS Loaded Success", async () => {
      const expectedAction = { type: types.tagsLoadedSuccess };
      await action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });

  });


  describe('api adverts tags error', () => {

    const action = tagsLoadAction();
    const dispatch = jest.fn();
    const state = {
        tags: {
            loaded: false
        }
    };
    const getState = () => state;
    const error = 'error';
    const api = {
      adverts: {
        getTags: jest.fn()
      },
    };

    /** after api call */
    test('should dispatch 2 action type: TAGS Loaded Error', async () => {
        const expectedAction = {
            type: types.tagsLoadedError,
            payload: error
        };
        api.adverts.getTags.mockRejectedValue(error);
        await action(dispatch, getState, { api });
        expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
    });
});

});
