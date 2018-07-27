import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  button: {
    alignSelf: 'stretch',
    height: 56,
    marginHorizontal: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#E33C00',
  },
  text: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});

export default class Button extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    active: false,
  };

  pressIn = () => this.setState({ active: true });

  pressOut = () => this.setState({ active: false });

  render() {
    const { onPress, title } = this.props;
    const { active } = this.state;

    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPressIn={this.pressIn}
        onPressOut={this.pressOut}
        onPress={onPress}
      >
        <View style={[styles.button, active && styles.buttonActive]}>
          <Text style={styles.text}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
