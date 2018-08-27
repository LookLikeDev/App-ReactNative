import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
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
  required: {
    color: '#FC4600',
  },
  validateText: {
    fontFamily: 'SF-UI-Text-Regular',
    color: '#FC4600',
    fontSize: 16,
    marginHorizontal: 20,
  },
  orange: {
    color: '#FC4600',
  },
});

export default class InputField extends React.Component {
  textInputRef = null;

  static propTypes = {
    labelText: PropTypes.string.isRequired,
    keyboardType: PropTypes.string,
    inputTextOrange: PropTypes.bool,
    handleChange: PropTypes.func,
    required: PropTypes.bool,
  };

  static defaultProps = {
    inputTextOrange: false,
    required: false,
    handleChange: null,
    keyboardType: 'default',
  };

  render() {
    const {
      labelText, inputTextOrange, handleChange, keyboardType, required,
      input: {
        onChange, onBlur, onFocus, value, ...restInput
      },
      meta: { touched, error, warning },
    } = this.props;

    return (
      <React.Fragment>
        <View style={styles.inputGroup}>
          <TouchableWithoutFeedback onPressIn={() => this.textInputRef.focus()}>
            <View>
              <Text style={styles.inputLabel}>
                {labelText}
                :
                {required && (
                <Text style={styles.required}>
                  *
                </Text>)}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            {...restInput}
            onChangeText={onChange}
            onEndEditing={handleChange}
            keyboardType={keyboardType}
            value={value}
            style={[styles.inputText, inputTextOrange && styles.orange]}
            underlineColorAndroid="transparent"
            onBlur={onBlur}
            onFocus={onFocus}
            ref={(input) => { this.textInputRef = input; }}
          />
        </View>
        {touched && error && (
        <Text style={styles.validateText}>
          Обязательно для заполнения
        </Text>
        )}
      </React.Fragment>
    );
  }
}
