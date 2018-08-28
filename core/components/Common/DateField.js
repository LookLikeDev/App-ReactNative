import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  inputGroup: {
    height: 56,
    marginLeft: 20,
    paddingRight: 12,
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
  inputTextWrap: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  inputText: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    color: '#000000',
  },
  orange: {
    color: '#FC4600',
  },
  icon: {
    transform: [{ rotate: '90deg' }],
  },
});

export default class DateField extends React.Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    inputTextOrange: PropTypes.bool,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    inputTextOrange: false,
    handleChange: null,
  };

  state = {
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    const { handleChange, input: { onChange } } = this.props;

    this.hideDateTimePicker();
    onChange(date);

    if (handleChange) {
      // TODO I promise to delete this after deleting redux-form ┬┴┬┴┤(･_├┬┴┬┴
      setTimeout(handleChange);
    }
  };

  render() {
    const {
      labelText, inputTextOrange,
      input: { value },
      meta: { touched, error, warning },
    } = this.props;
    const { isDateTimePickerVisible } = this.state;

    return (
      <React.Fragment>
        <TouchableOpacity style={styles.inputGroup} onPress={this.showDateTimePicker}>
          <Text style={styles.inputLabel}>
            {labelText}
            :
          </Text>
          <View style={styles.inputTextWrap}>
            <Text style={[styles.inputText, inputTextOrange && styles.orange]}>
              {value instanceof Date ? value.toLocaleDateString('ru-RU') : null}
            </Text>
          </View>
          <View style={styles.icon}>
            <MaterialIcons name="navigate-next" size={26} color="#A1A1A1" />
          </View>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          maximumDate={new Date()}
        />
        {/* <Text>{touched ? 'da' : 'net'}</Text>
        {touched && ((error && <Text>Error: {error}</Text>) || (warning && <Text>Warning: {warning}</Text>))} */}
      </React.Fragment>
    );
  }
}
