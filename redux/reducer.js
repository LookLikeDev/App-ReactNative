import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import routerReducer from './router';
import authReducer, { moduleName as authModule } from '../ducks/auth';
import looksReducer, { moduleName as looksModule } from '../ducks/looks';

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  [authModule]: authReducer,
  [looksModule]: looksReducer,
});
