import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import routerReducer from './router';
import userReducer, { moduleName as userModule } from '../ducks/user';
import looksReducer, { moduleName as looksModule } from '../ducks/looks';

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  [userModule]: userReducer,
  [looksModule]: looksReducer,
});
