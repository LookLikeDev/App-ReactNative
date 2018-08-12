import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Scene,
  Stack,
  Tabs,
  Router,
  Reducer,
} from 'react-native-router-flux';

import { resetFavoritesCounter } from '../ducks/user';

import SplashScreen from './screens/SplashScreen';
import MainScreen from './screens/MainScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import PhotoScreen from './screens/PhotoScreen';
import DescribeItemScreen from './screens/DescribeItemScreen';
import PublishLookScreen from './screens/PublishLookScreen';
import LooksScreen from './screens/LooksScreen';
import LookDetailScreen from './screens/LookDetailScreen';
import DiscountsListScreen from './screens/DiscountsListScreen';
import DiscountsDetailScreen from './screens/DiscountsDetailScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import ShopList from './screens/ShopList';

import TabIcon from './containers/TabIcon';
import NavBar from './components/NavBar';

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

class Root extends React.Component {
  static propTypes = {
    // from connect
    resetFavoritesCounter: PropTypes.func.isRequired,
  };

  render() {
    const { resetFavoritesCounter } = this.props;

    return (
      <ReduxRouter sceneStyle={{ backgroundColor: '#FFFFFF' }} navBar={NavBar}>
        <Modal hideNavBar>
          <Scene
            key="splashScreen"
            component={SplashScreen}
            title="Splash Screen"
            icon={({ focused }) => <TabIcon type="main" selected={focused} />}
          />
          <Tabs key="tabs" showLabel={false}>
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
              onEnter={resetFavoritesCounter}
              icon={({ focused }) => <TabIcon type="favorites" selected={focused} showCount />}
            />
            <Stack icon={({ focused }) => <TabIcon type="camera" selected={focused} />}>
              <Scene
                key="photo"
                component={PhotoScreen}
                title="Мой LOOK"
              />
              <Scene
                key="describeItem"
                component={DescribeItemScreen}
                title="Описать вещь"
              />
              <Scene
                key="publishLook"
                component={PublishLookScreen}
                title="Публикация"
              />
            </Stack>
            <Scene
              key="looks"
              component={LooksScreen}
              title="Мои луки"
              icon={({ focused }) => <TabIcon type="looks" selected={focused} />}
            />
            <Stack key="discounts" icon={({ focused }) => <TabIcon type="discounts" selected={focused} showCount />}>
              <Scene
                key="discountsList"
                component={DiscountsListScreen}
                title="Мои скидки"
              />
              <Scene
                key="discountsDetail"
                component={DiscountsDetailScreen}
                title="Промо-код"
              />
            </Stack>
          </Tabs>
          <Scene
            key="shopList"
            component={ShopList}
            title="Выбор магазина"
            hideNavBar={false}
          />
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
        </Modal>
      </ReduxRouter>
    );
  }
}

export default connect(state => ({}), {
  resetFavoritesCounter,
})(Root);
