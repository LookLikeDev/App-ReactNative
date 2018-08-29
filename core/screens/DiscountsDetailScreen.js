import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView,
} from 'react-native';
import PromoCode from '../containers/discounts/PromoCode';
import Header from '../containers/Header';

export default class DiscountsDetailScreen extends React.Component {
  static propTypes = {
    // from react-native-router-flux and <Scene />
    title: PropTypes.string.isRequired,
    discountId: PropTypes.string.isRequired,
  };

  render() {
    const { title, discountId } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <ScrollView style={{ flex: 1 }}>
          <PromoCode discountId={discountId} />
        </ScrollView>
      </View>
    );
  }
}
