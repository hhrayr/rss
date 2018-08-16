import * as actions from 'Redux/git/actions';
import * as constants from 'Redux/git/constants';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';
import {
  getGitRepos,
  getGitMarkedRepos,
  markGitRepo,
  unmarkGitRepo,
} from '../utils/apiProxy';

function* watchLoadRepos() {
  yield takeEvery(constants.GIT_LOAD_REPOS, loadReposAsync);
}

function* loadReposAsync(action) {
  try {
    const markedRepos = yield call(getGitMarkedRepos, action.payload);
    let repos = yield call(getGitRepos, action.payload);
    const numberOfItems = Math.min(repos.items.length, 10);
    const items = new Array(numberOfItems);
    for (let i = 0; i < numberOfItems; i++) {
      const repoItem = repos.items[i];
      items[i] = {
        id: repoItem.id,
        name: repoItem.name,
        owner: repoItem.owner.login,
        url: repoItem.html_url,
        marked: markedRepos.filter((r) => { return r.id === repoItem.id; }).length > 0,
      };
    }
    repos = {
      totalCount: repos.total_count,
      items,
    };
    yield put(actions.loadReposComplete(repos));
  } catch (err) {
    yield put(actions.loadReposError(err));
  }
}

function* watchLoadMarkedRepos() {
  yield takeEvery(constants.GIT_LOAD_REPOS_MARKED, loadMarkedReposAsync);
}

function* loadMarkedReposAsync(action) {
  try {
    const markedRepos = yield call(getGitMarkedRepos, action.payload);
    const repos = {
      totalCount: markedRepos.length,
      items: markedRepos,
    };
    yield put(actions.loadReposComplete(repos));
  } catch (err) {
    yield put(actions.loadReposError(err));
  }
}

function* watchAddBookmarkRepos() {
  yield takeEvery(constants.GIT_ADD_BOOKMARK, addBookmarkAsync);
}

function* addBookmarkAsync(action) {
  try {
    yield call(markGitRepo, action.payload);
    const state = yield select((s) => { return s; });
    const { repos } = state.git;
    const currentRepo = repos.items.filter((r) => { return r.id === action.payload.id; });
    if (currentRepo.length > 0) {
      currentRepo[0].marked = true;
    }
    yield put(actions.loadReposComplete(cloneDeep(repos)));
  } catch (err) {
    yield put(actions.loadReposError(err));
  }
}

function* watchRemoveBookmarkRepos() {
  yield takeEvery(constants.GIT_REMOVE_BOOKMARK, removeBookmarkAsync);
}

function* removeBookmarkAsync(action) {
  try {
    yield call(unmarkGitRepo, action.payload);
    const state = yield select((s) => { return s; });
    const { repos } = state.git;
    const currentRepo = repos.items.filter((r) => { return r.id === action.payload; });
    if (currentRepo.length > 0) {
      currentRepo[0].marked = false;
    }
    yield put(actions.loadReposComplete(cloneDeep(repos)));
  } catch (err) {
    yield put(actions.loadReposError(err));
  }
}

export default [
  watchLoadRepos(),
  watchLoadMarkedRepos(),
  watchAddBookmarkRepos(),
  watchRemoveBookmarkRepos(),
];
