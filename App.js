import React from 'react';
import { Font, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import Root from './core/containers/Root';
import store from './redux';
import './config';
import sfUiTextRegular from './assets/fonts/SF-UI-Text-Regular.ttf';
import sfUiTextSemiBold from './assets/fonts/SF-UI-Text-Semibold.ttf';
import sfProDisplayBlack from './assets/fonts/SF-Pro-Display-Black.ttf';
import sfProDisplayBold from './assets/fonts/SF-Pro-Display-Bold.ttf';
import sfProDisplaySemiBold from './assets/fonts/SF-Pro-Display-Semibold.ttf';

// TODO just do it;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  onFinishLoading = () => {
    this.setState({ isReady: true });
  };

  cacheResourcesAsync = async () => Font.loadAsync({
    'SF-UI-Text-Regular': sfUiTextRegular,
    'SF-UI-Text-Semibold': sfUiTextSemiBold,
    'SF-Pro-Display-Black': sfProDisplayBlack,
    'SF-Pro-Display-Bold': sfProDisplayBold,
    'SF-Pro-Display-Semibold': sfProDisplaySemiBold,
  });

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={this.onFinishLoading}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
