import React from 'react';
import { connect } from 'react-redux';
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PhotoScreen from './screens/PhotoScreen';
import LooksScreen from './screens/LooksScreen';
import DiscountsScreen from './screens/DiscountsScreen';
import TabIcon from './common/TabIcon';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" showLabel={false} tabs>
          <Scene
            key="main"
            component={MainScreen}
            title="LookLike"
            icon={() => <TabIcon type="main" />}
            hideNavBar
          />
          <Scene
            key="favorites"
            component={FavoritesScreen}
            title="Избранное"
            icon={() => <TabIcon type="favorites" count={25} />}
            hideNavBar
          />
          <Scene
            key="photo"
            component={PhotoScreen}
            title="Мой LOOK"
            icon={() => <TabIcon type="camera" />}
            hideNavBar
          />
          <Scene
            key="looks"
            component={LooksScreen}
            title="Мои луки"
            icon={() => <TabIcon type="looks" />}
            hideNavBar
          />
          <Scene
            key="discounts"
            component={DiscountsScreen}
            title="Мои скидки"
            icon={() => <TabIcon type="discounts" />}
            hideNavBar
          />
        </Stack>
      </Router>
    );
  }
}

export default connect()(Root);
