import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'; // TODO del this
import Header from '../containers/Header';

import { appName, firestore } from '../../config';

export default class FavoritesScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  // TODO delete after tested
  showData = () => {
    const looksRef = firestore.collection('looks');

    const query = looksRef.where('likes', '==', 1155).get().then(function(querySnapshot) {
      console.log(querySnapshot);
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <Button onPress={Actions.lookDetail} title="Перейти на экран 'Комментарии'" />
        <Button onPress={this.showData} title="Firebase" />
      </View>
    );
  }
}
