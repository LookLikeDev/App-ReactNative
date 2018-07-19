import React from 'react';
import { Provider } from 'react-redux';
import Root from './core/containers/Root';
import store from './redux';
import './config';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
