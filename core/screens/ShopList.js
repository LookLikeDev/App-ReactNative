import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ShopsList from '../containers/shops/ShopsList';
import Header from '../containers/Header';

export default class ShopList extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    shop: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    shop: {
      id: null,
      name: null,
    },
  };

  render() {
    const { title, shop } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <ShopsList shop={shop} />
      </View>
    );
  }
}
