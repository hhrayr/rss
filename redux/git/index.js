import * as constants from './constants';
import initialState from './initialState';

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.GIT_LOAD_REPOS:
      return {
        ...state,
        loading: true,
        loadingError: null,
        repos: null,
      };
    case constants.GIT_LOAD_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingError: null,
        repos: action.payload,
      };
    case constants.GIT_LOAD_REPOS_ERROR:
      return {
        ...state,
        loading: false,
        loadingError: action.payload,
        repos: null,
      };
    default:
      return state;
  }
}
