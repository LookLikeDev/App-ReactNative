import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
  },
  title: {
    fontFamily: 'SF-UI-Text-Semibold',
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#A1A1A1',
    textAlign: 'center',
  },
});

export default class LooksLoadedText extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Больше луков нет
        </Text>
        <Text style={styles.description}>
          Самое время вдохновиться новыми луками
        </Text>
      </View>
    );
  }
}
