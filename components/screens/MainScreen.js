import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../common/Header';

export default class MainScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <Button title="FavoritesScreen" onPress={Actions.favorites} />
        <Button title="PhotoScreen" onPress={Actions.photo} />
        <Button title="LooksScreen" onPress={Actions.looks} />
        <Button title="DiscountsScreen" onPress={Actions.discounts} />
      </View>
    );
  }
}
