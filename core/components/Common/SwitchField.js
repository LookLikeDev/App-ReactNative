import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Switch,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  switchGroup: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
});

export default class SwitchField extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    keyboardType: PropTypes.string,
    inputTextOrange: PropTypes.bool,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    inputTextOrange: false,
    handleChange: false,
    keyboardType: 'default',
  };

  render() {
    const {
      labelText, handleChange, input: { onChange, value, ...restInput },
    } = this.props;

    // console.log('WTF', restInput);
    return (
      <View style={styles.switchGroup}>
        <Text style={styles.switchLabel}>
          {labelText}
          :
        </Text>
        <Switch
          {...restInput}
          onChange={() => { onChange(!value); handleChange(); }}
          value={value}
        />
      </View>
    );
  }
}
