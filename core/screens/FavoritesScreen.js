import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../containers/Header';
import LooksListFavorites from '../containers/looks/LooksListFavorites';

export default class FavoritesScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    // from connect
    likedLooks: PropTypes.objectOf(PropTypes.object),
    initialed: PropTypes.bool.isRequired,
    updateList: PropTypes.func.isRequired,
    resetFavoritesCounter: PropTypes.func.isRequired,
  };

  static onEnter() {
    Actions.refs.favorites.getWrappedInstance().handleOnEnter();
  }

  handleOnEnter = () => {
    const {
      resetFavoritesCounter, updateList, likedLooks, initialed,
    } = this.props;

    resetFavoritesCounter();
    if (initialed) updateList(likedLooks);
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
