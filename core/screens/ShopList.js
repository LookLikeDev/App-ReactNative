import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import ShopsList from '../containers/Shops/ShopsList';
import Header from '../containers/Header';
import Button from '../components/Common/Button';

export default class ShopList extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <ShopsList />
        <Button onPress={() => { Actions.publishLook({ shop: { name: '', id: '' } }); }} title="Подтвердить" />
      </View>
    );
  }
}
