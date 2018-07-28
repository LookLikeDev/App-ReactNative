import React from 'react';
import PropTypes from 'prop-types';
import {
  View, FlatList,
} from 'react-native';
import LookItem from './LookItem';
import LooksLoadedText from './LooksLoadedText';

class LooksList extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
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
    this.getUsers();
  }

  getUsers = () => {
    const { id, loading, loaded, fetchList } = this.props;

    if (!loading && !loaded) {
      fetchList(id);
    }
  };

  keyExtractor = item => item.id;

  renderItem = ({ item: { user, image } }) => (
    <LookItem
      user={user}
      image={image}
    />
  );

  render() {
    const { loaded, entities } = this.props;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <FlatList
          data={entities}
          extraData={this.props}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.getUsers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={(loaded ? LooksLoadedText : null)}
        />
      </View>
    );
  }
}

export default LooksList;
