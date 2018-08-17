import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import Header from '../containers/Header';
import DiscountsList from '../containers/discounts/DiscountsList';

export default class DiscountsListScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    // from connect
    userId: PropTypes.string.isRequired,
    initialed: PropTypes.bool.isRequired,
    updateList: PropTypes.func.isRequired,
  };

  static onEnter() {
    Actions.refs.discountsList.getWrappedInstance().handleOnEnter();
  }

  handleOnEnter = () => {
    const { initialed, updateList, userId } = this.props;

    if (initialed) updateList(userId);
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <DiscountsList />
      </View>
    );
  }
}
