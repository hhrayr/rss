import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import git from './git';

export default combineReducers({
  router,
  git,
});
