import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import SplashScreen from './tmp/SplashScreen';
import MainScreen from './components/screens/MainScreen';

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);

export const RootNavigator = createStackNavigator({
  Splash: { screen: SplashScreen },
  Main: { screen: MainScreen },
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.navigation,
});

export const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);
