import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Picker,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: '#EBEBEB',
  },
  modalTopPanel: {
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
  },
  // -------------------
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
  // -------------------
});

export default class NativePicker extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    })).isRequired,
    handleChange: PropTypes.func.isRequired,
    // from Field
    labelText: PropTypes.string.isRequired,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    }).isRequired,
  };

  state = {
    isModalVisible: false,
    selectedValue: this.props.input.value,
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  handleValueChange = (itemValue) => {
    const {
      handleChange, input: { onChange },
    } = this.props;

    this.setState({ selectedValue: itemValue });
    onChange(itemValue);

    if (handleChange) {
      setTimeout(() => handleChange(itemValue), 1500);
    }
  };

  render() {
    const { items, labelText } = this.props;
    const { selectedValue, isModalVisible } = this.state;
    const selectedItem = items.find(item => item.value === selectedValue);

    if (Platform.OS === 'android') {
      return (
        <Picker
          mode="dialog"
          prompt="Пол"
          selectedValue={selectedValue}
          onValueChange={this.handleValueChange}
        >
          {items.map(item => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
        </Picker>
      );
    }

    return (
      <React.Fragment>
        <TouchableOpacity style={styles.inputGroup} onPress={this.toggleModal}>
          <Text style={styles.inputLabel}>
            {labelText}
            :
          </Text>
          <View style={styles.inputTextWrap}>
            <Text style={styles.inputText}>
              {selectedItem.label || null}
            </Text>
          </View>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTopPanel}>
              <Button onPress={this.toggleModal} style={{ textAlign: 'right' }} title="Выбрать" />
            </View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={this.handleValueChange}
            >
              {items.map(item => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
            </Picker>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}
