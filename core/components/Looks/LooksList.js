import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { moduleName, fetchList } from '../../../ducks/looks';
import {
  View, FlatList, Button, Text,
} from 'react-native';
import { appName, firestore } from '../../../config';
import LookItem from './LookItem';
import store from '../../../redux';


// TODO I promise to refactor this code.
class LooksList extends React.Component {
  state = {
    data: [],
    disabled: true,
    loading: false,
  };

  lastVisible = null;

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const { loading, loaded, fetchList } = this.props;

    if (!loading && !loaded) {
      fetchList();
    }
  };

  keyExtractor = item => item.id;

  renderItem = ({ item: { id, user, image } }) => (
    <LookItem
      user={user}
      image={image}
    />
  );

  render() {
    return (
      <View>
        <Text>
          {this.props.loaded && 'loaded'}
        </Text>
        <Text>
          {this.props.loading && 'Loading'}
        </Text>
        <FlatList
          data={this.props.entities}
          extraData={this.props}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReached={this.getUsers}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

// TODO create selectors for entities
export default connect(state => ({
  loading: state[moduleName].loading,
  loaded: state[moduleName].loaded,
  entities: state[moduleName].entities.toArray(),
}), {
  fetchList,
})(LooksList);
