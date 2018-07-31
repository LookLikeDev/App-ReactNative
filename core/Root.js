import React from 'react';
import {
  Scene,
  Stack,
  Tabs,
  Router,
} from 'react-native-router-flux';
import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PhotoScreen from './screens/PhotoScreen';
import MarkItemsScreen from './screens/MarkItemsScreen';
import DescribeItemScreen from './screens/DescribeItemScreen';
import PublishLookScreen from './screens/PublishLookScreen';
import LooksScreen from './screens/LooksScreen';
import LookDetailScreen from './screens/LookDetailScreen';
import DiscountsListScreen from './screens/DiscountsListScreen';
import DiscountsDetailScreen from './screens/DiscountsDetailScreen';
import PreferencesScreen from './screens/PreferencesScreen';

import TabIcon from './components/TabIcon';
import NavBar from './components/NavBar';

export default class Root extends React.Component {
  render() {
    return (
      <Router sceneStyle={{ backgroundColor: '#FFFFFF' }} navBar={NavBar}>
        <Stack key="root" modal hideNavBar>
          <Scene
            key="splashScreen"
            component={SplashScreen}
            title="Splash Screen"
            icon={({ focused }) => <TabIcon type="main" selected={focused} />}
          />
          <Tabs key="tabs" showLabel={false} activeTintColor="#000000">
            <Scene
              key="main"
              component={MainScreen}
              title="Look Like"
              icon={({ focused }) => <TabIcon type="main" selected={focused} />}
            />
            <Scene
              key="favorites"
              component={FavoritesScreen}
              title="Избранное"
              icon={({ focused }) => <TabIcon type="favorites" selected={focused} showCount />}
            />
            <Stack>
              <Scene
                key="photo"
                component={PhotoScreen}
                title="Мой LOOK"
                icon={({ focused }) => <TabIcon type="camera" selected={focused} />}
              />
              <Scene
                key="markItems"
                component={MarkItemsScreen}
                title="Отметить вещи"
                icon={({ focused }) => <TabIcon type="camera" selected={focused} />}
              />
              <Scene
                key="describeItem"
                component={DescribeItemScreen}
                title="Описать вещь"
                icon={({ focused }) => <TabIcon type="camera" selected={focused} />}
              />
              <Scene
                key="publishLook"
                component={PublishLookScreen}
                title="Публикация"
                icon={({ focused }) => <TabIcon type="camera" selected={focused} />}
              />
            </Stack>
            <Scene
              key="looks"
              component={LooksScreen}
              title="Мои луки"
              icon={({ focused }) => <TabIcon type="looks" selected={focused} />}
            />
            <Stack key="discounts">
              <Scene
                key="discountsList"
                component={DiscountsListScreen}
                title="Мои скидки"
                icon={({ focused }) => <TabIcon type="discounts" selected={focused} />}
              />
              <Scene
                key="discountsDetail"
                component={DiscountsDetailScreen}
                title="Промо-код"
                icon={({ focused }) => <TabIcon type="discounts" selected={focused} />}
              />
            </Stack>
          </Tabs>
          <Scene
            key="lookDetail"
            component={LookDetailScreen}
            title="Комментарии"
            hideNavBar={false}
          />
          <Scene
            key="preferences"
            component={PreferencesScreen}
            title="Настройки"
            hideNavBar={false}
          />
        </Stack>
      </Router>
    );
  }
}
