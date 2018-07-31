import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../containers/Header';

import { appName, firestore } from '../../config';

export default class FavoritesScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  // TODO delete after tested
  showData = () => {
    firestore.collection('users').doc('zY2xI9inQYcTWdEmDrDd').get().then((docSnapshot) => {
      console.log(docSnapshot);
      console.log(docSnapshot.data());
    }).catch((error) => {
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
