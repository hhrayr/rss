import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import gitWatchers from './git';

export default function* rootSaga() {
  try {
    const sagas = []
      .concat(gitWatchers);
    yield all(sagas);
  } catch (e) {
    console.log('rootSaga error:', e);
    throw e;
  }
}

