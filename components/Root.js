import React from 'react';
import { connect } from 'react-redux';
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';
import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PhotoScreen from './screens/PhotoScreen';
import LooksScreen from './screens/LooksScreen';
import DiscountsScreen from './screens/DiscountsScreen';

const ConnectedRouter = connect()(Router);

export default class Root extends React.Component {
  render() {
    return (
      <ConnectedRouter>
        <Stack key="root">
          <Scene key="splash" component={SplashScreen} title="SplashScreen" />
          <Scene key="main" component={MainScreen} title="MainScreen" />
          <Scene key="favorites" component={FavoritesScreen} title="FavoritesScreen" />
          <Scene key="photo" component={PhotoScreen} title="PhotoScreen" />
          <Scene key="looks" component={LooksScreen} title="LooksScreen" />
          <Scene key="discounts" component={DiscountsScreen} title="DiscountsScreen" />
        </Stack>
      </ConnectedRouter>
    );
  }
}
