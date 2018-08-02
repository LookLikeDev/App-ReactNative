import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Button from '../Common/Button';
import Input from '../Common/Input';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  text: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginHorizontal: 20,
    color: '#A1A1A1',
  },
  group: {
    marginBottom: 20,
  },
  submit: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginHorizontal: 20,
  },
});

export default class LookPublishForm extends React.Component {
  static propTypes = {
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  onSave = (values) => {
    console.log('form values', values);
  };

  onCancel = (values) => {
    console.log('form values', values);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          <Field name="name" labelText="Название вещи" component={Input} />
          <Field name="brand" labelText="Бренд" component={Input} inputTextOrange />
          <Field name="price" labelText="Цена" keyboardType="number-pad" component={Input} />
        </View>
        <View style={styles.submit}>
          <Button title="Отменить" type="" onPress={handleSubmit(this.onSave)} />
          <Button title="Сохранить" onPress={handleSubmit(this.onCancel)} />
        </View>
      </ScrollView>
    );
  }
}
