import * as constants from './constants';

export const loadRepos = (payload) => {
  return {
    type: constants.GIT_LOAD_REPOS,
    payload,
  };
};

export const loadMarkedRepos = () => {
  return {
    type: constants.GIT_LOAD_REPOS_MARKED,
  };
};

export const loadReposComplete = (payload) => {
  return {
    type: constants.GIT_LOAD_REPOS_SUCCESS,
    payload,
  };
};

export const loadReposError = (payload) => {
  return {
    type: constants.GIT_LOAD_REPOS_ERROR,
    payload,
  };
};

export const addBookmark = (payload) => {
  return {
    type: constants.GIT_ADD_BOOKMARK,
    payload,
  };
};

export const removeBookmark = (payload) => {
  return {
    type: constants.GIT_REMOVE_BOOKMARK,
    payload,
  };
};
