import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    flex: 1,
    top: -14,
    right: -14,
    borderRadius: 26,
    width: 26,
    height: 26,
    backgroundColor: '#FC4600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontFamily: 'SF-Pro-Display-Semibold',
    color: 'white',
    fontSize: 14,
    lineHeight: 26,
    textAlign: 'center',
  },
});

export default class Badge extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
  };

  render() {
    const { count } = this.props;
    return (
      <View style={styles.badge}>
        <Text style={styles.count}>
          {count}
        </Text>
      </View>
    );
  }
}
