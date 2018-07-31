import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import routerReducer from './router';
import userReducer, { moduleName as userModule } from '../ducks/user';
import looksGeneralReducer, { moduleName as looksGeneralModule } from '../ducks/looksGeneral';
import looksUserReducer, { moduleName as looksUserModule } from '../ducks/looksUser';

export default combineReducers({
  // router: routerReducer,
  form: formReducer,
  [userModule]: userReducer,
  [looksGeneralModule]: looksGeneralReducer,
  [looksUserModule]: looksUserReducer,
});
