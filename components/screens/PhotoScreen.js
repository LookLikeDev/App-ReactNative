import React from 'react';
import {
  View, Text,
} from 'react-native';

export default class PhotoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Photo Screen
        </Text>
      </View>
    );
  }
}
