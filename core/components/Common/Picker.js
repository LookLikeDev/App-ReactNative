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
});

export default class NativePicker extends React.Component {
  state = {
    isModalVisible: false,
    selectedValue: null,
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  handleValueChange = (itemValue) => {
    console.log(itemValue);
    this.setState({ selectedValue: itemValue });
  };

  render() {
    const { selectedValue, isModalVisible } = this.state;

    if (Platform.OS === 'android') {
      return (
        <Picker
          mode="dialog"
          prompt="Пол"
          selectedValue={selectedValue}
          onValueChange={this.handleValueChange}
        >
          <Picker.Item label="Не указан" value={null} />
          <Picker.Item label="Мужской" value={false} />
          <Picker.Item label="Женский" value />
        </Picker>
      );
    }

    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.toggleModal}>
          <Text>
            Show Modal
          </Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContainer}>
            <View>
              <Button onPress={this.toggleModal} style={{ textAlign: 'right' }} title="Выбрать" />
            </View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={this.handleValueChange}
            >
              <Picker.Item label="Не указан" value={null} />
              <Picker.Item label="Мужской" value={false} />
              <Picker.Item label="Женский" value />
            </Picker>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}
