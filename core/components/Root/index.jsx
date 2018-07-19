import React from 'react';
import {
  Scene,
  Router,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import MainScreen from '../Screens/MainScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import PhotoScreen from '../Screens/PhotoScreen';
import LooksScreen from '../Screens/LooksScreen';
import DiscountsListScreen from '../Screens/DiscountsListScreen';
import DiscountsDetailScreen from '../Screens/DiscountsDetailScreen';
import PreferencesScreen from '../Screens/PreferencesScreen';
import TabIcon from '../TabIcon/TabIcon';

export default class Root extends React.Component {
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
