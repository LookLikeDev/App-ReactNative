import { ActionConst } from 'react-native-router-flux';

export default function reducer(state = {}, action) {
  const { type, scene } = action;

  switch (type) {
    // this case just example how it work
    case ActionConst.FOCUS:
      return { ...state, scene };

    default:
      return state;
  }
}
