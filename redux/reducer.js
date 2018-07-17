import { combineReducers } from 'redux';
import routerReducer from './router';
import authReducer, { moduleName as authModule } from '../ducks/auth';

export default combineReducers({
  router: routerReducer,
  [authModule]: authReducer,
});
