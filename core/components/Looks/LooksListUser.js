import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, ActivityIndicator,
} from 'react-native';
import LookItem from './LookItem';
import LooksLoadedText from './LooksLoadedText';

export default class LooksListUser extends React.Component {
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
  };

  componentDidMount() {
    this.handleGetUsers();
  }

  keyExtractor = item => item.id;

  handleGetUsers = () => {
    const {
      userId, loading, loaded, fetchList,
    } = this.props;

    if (!loading && !loaded) fetchList(userId);
  };

  renderItem = ({ item: { id, user, image } }) => {
    const { userId } = this.props;

    return (
      <LookItem
        id={id}
        userId={userId}
        user={user}
        image={image}
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
        />
      </View>
    );
  }
}
