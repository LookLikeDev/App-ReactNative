import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList, ActivityIndicator, LayoutAnimation,
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
      reference: PropTypes.objectOf(PropTypes.object).isRequired,
    })).isRequired,
    likedLooks: PropTypes.objectOf(PropTypes.object),
    fetchList: PropTypes.func.isRequired,
    resetVotedCounter: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { entities, resetVotedCounter } = this.props;

    resetVotedCounter();
    if (entities.length === 0) this.handleGetUsers();
  }

  componentWillUpdate() {
    const config = {
      duration: 300,
      update: {
        type: 'linear',
      },
    };
    LayoutAnimation.configureNext(config);
  }

  keyExtractor = item => item.id;

  handleGetUsers = () => {
    const {
      loading, loaded, fetchList, likedLooks,
    } = this.props;

    if (!loading && !loaded) fetchList(likedLooks);
  };

  renderItem = ({ item }) => {
    const { userId } = this.props;

    return (
      <LookItem
        data={item}
        userId={userId}
      />
    );
  };

  renderFooter = () => {
    const { loading, loaded } = this.props;

    if (loaded) return <LooksLoadedText />;

    if (loading) {
      return (
        <View style={{ marginBottom: 26, marginTop: 8 }}>
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

export default LooksListGeneral;
