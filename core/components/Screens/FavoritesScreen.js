import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../containers/Header';

export default class FavoritesScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <Button onPress={Actions.lookDetail} title="Перейти на экран 'Комментарии'" />
      </View>
    );
  }
}
