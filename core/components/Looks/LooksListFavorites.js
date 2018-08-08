import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator } from 'react-native';
import CardFavorite from './Cards/CardFavorite';
import LooksLoadedText from './LooksLoadedText';
import Separator from '../Common/Separator';

class LooksListGeneral extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    voting: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture_uri: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      reference: PropTypes.objectOf(PropTypes.object).isRequired,
    })).isRequired,
    likedLooks: PropTypes.objectOf(PropTypes.object).isRequired,
    fetchList: PropTypes.func.isRequired,
    resetFavoritesCounter: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { entities, resetFavoritesCounter } = this.props;

    resetFavoritesCounter();
    if (entities.length === 0) this.handleGetUsers();
  }

  keyExtractor = item => item.id;

  handleGetUsers = () => {
    const {
      loading, loaded, fetchList, likedLooks,
    } = this.props;

    if (!loading && !loaded) fetchList(likedLooks);
  };

  renderItem = ({ item }) => <CardFavorite voting={this.props.voting} data={item} />;

  renderFooter = () => {
    const { loading, loaded } = this.props;

    if (loaded) return <LooksLoadedText />;

    if (loading) {
      return (
        <View style={{ marginBottom: 26 }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }

    return null;
  };

  render() {
    const { entities } = this.props;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <FlatList
          data={entities}
          extraData={this.props}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.handleGetUsers}
          onEndReachedThreshold={0.4}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={Separator}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

export default LooksListGeneral;
