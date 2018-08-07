import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator } from 'react-native';
import CardGeneral from './Cards/CardGeneral';
import LooksLoadedText from './LooksLoadedText';
import Separator from '../Common/Separator';

class LooksListGeneral extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      items: PropTypes.arrayOf(PropTypes.object),
      picture_uri: PropTypes.string.isRequired,
    })).isRequired,
    fetchList: PropTypes.func.isRequired,
    likedLooks: PropTypes.objectOf(PropTypes.object),
    dislikedLooks: PropTypes.objectOf(PropTypes.object),
    removeItem: PropTypes.func.isRequired,
    lookLike: PropTypes.func.isRequired,
    lookDislike: PropTypes.func.isRequired,
  };

  static defaultProps = {
    likedLooks: null,
    dislikedLooks: null,
  };

  componentDidMount() {
    const { entities } = this.props;

    if (entities.length === 0) this.handleGetUsers();
  }

  keyExtractor = item => item.id;

  handleGetUsers = () => {
    const {
      loading, loaded, fetchList, likedLooks, dislikedLooks,
    } = this.props;

    if (!loading && !loaded) fetchList({ ...likedLooks, ...dislikedLooks });
  };

  handleLike = (item) => {
    const { removeItem, lookLike, userId } = this.props;

    lookLike(item, userId);
    removeItem(item);
  };

  handleDislike = (item) => {
    const { removeItem, lookDislike, userId } = this.props;

    lookDislike(item, userId);
    removeItem(item);
  };

  renderItem = ({ item }) => {
    const { userId } = this.props;

    return (
      <CardGeneral
        data={item}
        userId={userId}
        onPressLike={this.handleLike}
        onPressDislike={this.handleDislike}
      />
    );
  };

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
