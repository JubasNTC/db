import {
  SET_LOADING,
} from '../actions/app';

const initialState = {
  isLoading: false,
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};

export { appReducer };