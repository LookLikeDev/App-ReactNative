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
    // marginHorizontal: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC4600',
  },
  buttonMaterial: {
    alignSelf: 'stretch',
    height: 56,
    // marginHorizontal: 20,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FC4600',
  },
  buttonMaterialActive: {
    backgroundColor: '#FC4600',
  },
  borderLess: {
    borderRadius: 0,
  },
  buttonActive: {
    backgroundColor: '#E33C00',
  },
  text: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textOrange: {
    color: '#FC4600',
  },
});

export default class Button extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    borderLess: PropTypes.bool,
  };

  static defaultProps = {
    type: 'default',
    borderLess: false,
  };

  state = {
    active: false,
  };

  pressIn = () => this.setState({ active: true });

  pressOut = () => this.setState({ active: false });


  renderDefault = () => {
    const { onPress, title, borderLess } = this.props;
    const { active } = this.state;

    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPressIn={this.pressIn}
        onPressOut={this.pressOut}
        onPress={onPress}
      >
        <View style={[
          styles.button,
          active && styles.buttonActive,
          borderLess && styles.borderLess,
        ]}
        >
          <Text style={styles.text}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderMaterial = () => {
    const { onPress, title } = this.props;
    const { active } = this.state;

    return (
      <TouchableWithoutFeedback
        style={styles.container}
        onPressIn={this.pressIn}
        onPressOut={this.pressOut}
        onPress={onPress}
      >
        <View style={[styles.buttonMaterial, active && styles.buttonMaterialActive]}>
          <Text style={[styles.text, active ? styles.textWhite : styles.textOrange]}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { type } = this.props;
    const isMaterial = type === 'material';

    return isMaterial ? this.renderMaterial() : this.renderDefault();
  }
}
