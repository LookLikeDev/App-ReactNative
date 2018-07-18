import React from 'react';
import { connect } from 'react-redux';
import {
  Scene,
  Router,
  Stack,
  Tabs,
  Overlay,
} from 'react-native-router-flux';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PhotoScreen from './screens/PhotoScreen';
import LooksScreen from './screens/LooksScreen';
import DiscountsListScreen from './screens/DiscountsListScreen';
import DiscountsDetailScreen from './screens/DiscountsDetailScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import TabIcon from './common/TabIcon';

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Tabs key="tabs" showLabel={false}>
            <Scene
              key="main"
              component={MainScreen}
              title="Look Like"
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
              component={DiscountsListScreen}
              title="Мои скидки"
              icon={() => <TabIcon type="discounts" />}
              hideNavBar
            />
          </Tabs>
          <Scene
            key="preferences"
            component={PreferencesScreen}
            title="Настройки"
          />
          <Scene
            key="discountsDetail"
            component={DiscountsDetailScreen}
            title="Промо-код"
            icon={() => <TabIcon type="discounts" />}
          />
        </Stack>
      </Router>
    );
  }
}

export default connect()(Root);
