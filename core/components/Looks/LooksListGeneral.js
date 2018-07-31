import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, ActivityIndicator,
} from 'react-native';
import LookItem from './LookItem';
import LooksLoadedText from './LooksLoadedText';

class LooksListGeneral extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })).isRequired,
    fetchList: PropTypes.func.isRequired,
    itemRemove: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.handleGetUsers();
  }

  keyExtractor = item => item.id;

  handleGetUsers = () => {
    const { loading, loaded, fetchList } = this.props;

    if (!loading && !loaded) fetchList();
  };

  handleLike = (id) => {
    const { itemRemove, like, userId } = this.props;

    like(id, userId);
    itemRemove(id);
  };

  handleDislike = (id) => {
    const { itemRemove, dislike, userId } = this.props;

    dislike(id, userId);
    itemRemove(id);
  };

  renderItem = ({ item: { id, user, image } }) => {
    const { userId } = this.props;

    return (
      <LookItem
        id={id}
        userId={userId}
        user={user}
        image={image}
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
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

export default LooksListGeneral;
