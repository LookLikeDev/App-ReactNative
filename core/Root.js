import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import {
  Modal,
  Scene,
  Stack,
  Tabs,
  Router,
  Reducer,
} from 'react-native-router-flux';

import SplashScreen from './screens/SplashScreen';
import MainScreen from './containers/screens/MainScreen';
import CameraScreen from './containers/screens/CameraScreen';
import PhotoScreen from './containers/screens/PhotoScreen';
import LooksScreen from './containers/screens/LooksScreen';
import FavoritesScreen from './containers/screens/FavoritesScreen';
import DiscountsListScreen from './containers/screens/DiscountsListScreen';
import DescribeItemScreen from './screens/DescribeItemScreen';
import PublishLookScreen from './screens/PublishLookScreen';
import LookDetailScreen from './screens/LookDetailScreen';
import DiscountsDetailScreen from './screens/DiscountsDetailScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import ShopList from './screens/ShopList';
import PolicyScreen from './screens/PolicyScreen';

import TabIcon from './containers/TabIcon';

import LeftButton from './components/NavBar/LeftButton';
import PreferencesButton from './components/NavBar/PreferencesButton';
import CloseButton from './components/NavBar/CloseButton';

const ReduxRouter = connect()(({ dispatch, children, ...props }) => (
  <Router
    {...props}
    createReducer={params => (state, action) => {
      dispatch(action);
      return Reducer(params)(state, action);
    }}
  >
    {children}
  </Router>
));

export default class Root extends React.Component {
  render() {
    return (
      <ReduxRouter
        sceneStyle={{ backgroundColor: '#FFFFFF' }}
        navigationBarStyle={{
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 0,
          marginHorizontal: 20,
          height: 44,
          elevation: 0,
        }}
      >
        <Stack key="root" hideNavBar>
          <Scene
            key="splashScreen"
            title="Splash Screen"
            component={SplashScreen}
            icon={({ focused }) => <TabIcon type="main" selected={focused} />}
          />
          <Tabs key="tabs" showLabel={false} swipeEnabled={false} animationEnabled={false}>
            <Scene
              key="main"
              title="Look Like"
              component={MainScreen}
              renderBackButton={() => <LeftButton />}
              renderRightButton={() => <PreferencesButton />}
              renderTitle={() => <Text />}
              icon={({ focused }) => <TabIcon type="main" selected={focused} />}
            />
            <Scene
              key="favorites"
              title="Избранное"
              component={FavoritesScreen}
              renderBackButton={() => <LeftButton />}
              renderRightButton={() => <PreferencesButton />}
              renderTitle={() => <Text />}
              icon={({ focused }) => <TabIcon type="favorites" selected={focused} showCount />}
            />
            <Stack key="photoStack" icon={({ focused }) => <TabIcon type="camera" selected={focused} />}>
              <Scene
                key="camera"
                component={CameraScreen}
              />
              <Scene
                key="photo"
                title="Мой LOOK"
                component={PhotoScreen}
                renderBackButton={() => <LeftButton />}
                renderRightButton={() => <PreferencesButton />}
                renderTitle={() => <Text />}
              />
              <Scene
                key="publishLook"
                title="Публикация"
                component={PublishLookScreen}
                renderBackButton={() => <LeftButton />}
                renderRightButton={() => <PreferencesButton />}
                renderTitle={() => <Text />}
              />
            </Stack>
            <Scene
              key="looks"
              title="Мои луки"
              component={LooksScreen}
              renderBackButton={() => <LeftButton />}
              renderRightButton={() => <PreferencesButton />}
              renderTitle={() => <Text />}
              icon={({ focused }) => <TabIcon type="looks" selected={focused} />}
            />
            <Stack key="discounts" icon={({ focused }) => <TabIcon type="discounts" selected={focused} showCount />}>
              <Scene
                key="discountsList"
                title="Мои скидки"
                component={DiscountsListScreen}
                renderBackButton={() => <LeftButton />}
                renderRightButton={() => <PreferencesButton />}
                renderTitle={() => <Text />}
              />
            </Stack>
          </Tabs>
          <Scene
            key="describeItem"
            title="Описать вещь"
            component={DescribeItemScreen}
            renderBackButton={() => <LeftButton />}
            renderRightButton={() => <PreferencesButton />}
            renderTitle={() => <Text />}
            hideNavBar={false}
          />
          <Scene
            key="discountsDetail"
            title="Промо-код"
            component={DiscountsDetailScreen}
            renderBackButton={() => <LeftButton />}
            renderRightButton={() => <PreferencesButton />}
            renderTitle={() => <Text />}
            hideNavBar={false}
          />
          <Scene
            key="shopList"
            title="Выбор магазина"
            component={ShopList}
            renderBackButton={() => <LeftButton />}
            renderRightButton={() => <PreferencesButton />}
            renderTitle={() => <Text />}
            hideNavBar={false}
          />
          <Scene
            key="lookDetail"
            title="Комментарии"
            component={LookDetailScreen}
            hideNavBar={false}
          />
          <Scene
            key="preferences"
            title="Настройки"
            component={PreferencesScreen}
            renderBackButton={() => <Text />}
            renderRightButton={() => <CloseButton />}
            renderTitle={() => <Text />}
            hideNavBar={false}
          />
          <Scene
            key="policy"
            title="Политика конфиденциальности"
            component={PolicyScreen}
            renderBackButton={() => <Text />}
            renderRightButton={() => <CloseButton />}
            renderTitle={() => <Text />}
            hideNavBar={false}
          />
        </Stack>
      </ReduxRouter>
    );
  }
}
