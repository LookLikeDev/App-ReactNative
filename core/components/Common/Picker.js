import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Picker,
  Platform,
} from 'react-native';

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
  icon: {
    transform: [{ rotate: '90deg' }],
  },
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
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {labelText}
            :
          </Text>
          <View style={styles.inputTextWrap}>
            <Text style={styles.inputText}>
              {selectedItem.label || null}
            </Text>
          </View>
          <View style={styles.icon}>
            <MaterialIcons name="navigate-next" size={26} color="#A1A1A1" />
          </View>
          <Picker
            mode="dialog"
            prompt="Пол"
            selectedValue={selectedValue}
            onValueChange={this.handleValueChange}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0,
            }}
          >
            {items.map(item => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
          </Picker>
        </View>
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
          <View style={styles.icon}>
            <MaterialIcons name="navigate-next" size={26} color="#A1A1A1" />
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
