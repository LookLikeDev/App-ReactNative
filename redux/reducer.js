import { combineReducers } from 'redux';
import routerReducer from './router';
import authReducer, { moduleName as authModule } from '../ducks/auth';
import looksReducer, { moduleName as looksModule } from '../ducks/looks';

export default combineReducers({
  router: routerReducer,
  [authModule]: authReducer,
  [looksModule]: looksReducer,
});
