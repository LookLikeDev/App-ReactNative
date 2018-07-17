import React from 'react';
import {
  View, Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="FavoritesScreen" onPress={Actions.favorites} />
        <Button title="PhotoScreen" onPress={Actions.photo} />
        <Button title="LooksScreen" onPress={Actions.looks} />
        <Button title="DiscountsScreen" onPress={Actions.discounts} />
      </View>
    );
  }
}
