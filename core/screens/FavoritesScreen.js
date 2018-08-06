import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from '../containers/Header';
import LooksListFavorites from '../containers/Looks/LooksListFavorites';

export default class FavoritesScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    // TODO добавить загрузку луков если счетчик голосов больше 0 и до этого луки уже загружались
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <LooksListFavorites />
      </View>
    );
  }
}
