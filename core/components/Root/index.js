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
import MarkItemsScreen from '../Screens/MarkItemsScreen';
import DescribeItemScreen from '../Screens/DescribeItemScreen';
import ShareItemScreen from '../Screens/ShareItemScreen';
import LooksScreen from '../Screens/LooksScreen';
import LookDetailScreen from '../Screens/LookDetailScreen';
import DiscountsListScreen from '../Screens/DiscountsListScreen';
import DiscountsDetailScreen from '../Screens/DiscountsDetailScreen';
import PreferencesScreen from '../Screens/PreferencesScreen';
import TabIcon from '../TabIcon';

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar>
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
            <Stack>
              <Scene
                key="photo"
                component={PhotoScreen}
                title="Мой LOOK"
                icon={() => <TabIcon type="camera" />}
                hideNavBar
              />
              <Scene
                key="markItems"
                component={MarkItemsScreen}
                title="Отметить вещи"
                icon={() => <TabIcon type="camera" />}
              />
              <Scene
                key="describeItem"
                component={DescribeItemScreen}
                title="Описать вещь"
                icon={() => <TabIcon type="camera" />}
              />
              <Scene
                key="shareItem"
                component={ShareItemScreen}
                title="Опубликовать вещь"
                icon={() => <TabIcon type="camera" />}
              />
            </Stack>
            <Scene
              key="looks"
              component={LooksScreen}
              title="Мои луки"
              icon={() => <TabIcon type="looks" />}
              hideNavBar
            />
            <Stack>
              <Scene
                key="discounts"
                component={DiscountsListScreen}
                title="Мои скидки"
                icon={() => <TabIcon type="discounts" />}
                hideNavBar
              />
              <Scene
                key="discountsDetail"
                component={DiscountsDetailScreen}
                title="Промо-код"
                icon={() => <TabIcon type="discounts" />}
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
