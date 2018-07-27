import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  inputGroup: {
    height: 56,
    marginLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#BCBBC1',
  },
  inputLabel: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    lineHeight: 16,
    color: '#A1A1A1',
    paddingRight: 6,
  },
  inputText: {
    flex: 1,
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    color: '#000000',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  orange: {
    color: '#FC4600',
  },
});

export default class Button extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    inputTextOrange: PropTypes.bool,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    inputTextOrange: false,
    handleChange: false,
  };

  renderInput = ({ style, input: { onChange, ...restInput } }) => (
    <TextInput
      onChangeText={onChange}
      {...restInput}
      style={style}
    />
  );

  render() {
    const { labelText, inputTextOrange, handleChange, input: { onChange, ...restInput } } = this.props;
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>
          {labelText}
          :
        </Text>
        <TextInput
          onChangeText={onChange}
          onEndEditing={handleChange}
          {...restInput}
          style={[styles.inputText, inputTextOrange && styles.orange]}
        />
      </View>
    );
  }
}
