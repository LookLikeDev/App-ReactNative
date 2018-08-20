import React from 'react';
import { StatusBar } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import store from './redux';
import Root from './core/Root';

import sfUiTextRegular from './assets/fonts/SF-UI-Text-Regular.ttf';
import sfUiTextSemiBold from './assets/fonts/SF-UI-Text-Semibold.ttf';
import sfUiTextBold from './assets/fonts/SF-UI-Text-Bold.ttf';
import sfProDisplayBlack from './assets/fonts/SF-Pro-Display-Black.ttf';
import sfProDisplayBold from './assets/fonts/SF-Pro-Display-Bold.ttf';
import sfProDisplaySemiBold from './assets/fonts/SF-Pro-Display-Semibold.ttf';
import barcode128 from './assets/fonts/Barcode-128.ttf';
import './config';

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
    'SF-UI-Text-Bold': sfUiTextBold,
    'SF-Pro-Display-Black': sfProDisplayBlack,
    'SF-Pro-Display-Bold': sfProDisplayBold,
    'SF-Pro-Display-SemiBold': sfProDisplaySemiBold,
    'Barcode-128': barcode128,
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
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <Provider store={store}>
          <Root />
        </Provider>
      </React.Fragment>
    );
  }
}
