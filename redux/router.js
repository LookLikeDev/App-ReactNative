import { Reducer, ActionConst } from 'react-native-router-flux';

const defaultReducer = Reducer();

export default function reducer(state, action) {
  console.log('Reducing action: ', action.type);

  switch (action.type) {
    case ActionConst.FOCUS:
      return defaultReducer(state, action);

    default:
      return defaultReducer(state, action);
  }
}
