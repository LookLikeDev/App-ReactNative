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

export default class InputField extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    keyboardType: PropTypes.string,
    inputTextOrange: PropTypes.bool,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    inputTextOrange: false,
    handleChange: null,
    keyboardType: 'default',
  };

  render() {
    const {
      labelText, inputTextOrange, handleChange, keyboardType,
      input: { onChange, onBlur, onFocus, value, ...restInput },
      meta: { touched, error, warning },
    } = this.props;

    return (
      <React.Fragment>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {labelText}
            :
          </Text>
          <TextInput
            onChangeText={onChange}
            onEndEditing={handleChange}
            keyboardType={keyboardType}
            value={value}
            style={[styles.inputText, inputTextOrange && styles.orange]}
            onBlur={onBlur}
            onFocus={onFocus}
            {...restInput}
          />
        </View>
        {/*<Text>{touched ? 'da' : 'net'}</Text>
        {touched && ((error && <Text>Error: {error}</Text>) || (warning && <Text>Warning: {warning}</Text>))}*/}
      </React.Fragment>
    );
  }
}
