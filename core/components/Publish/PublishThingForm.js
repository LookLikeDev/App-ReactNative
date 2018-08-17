import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Field } from 'redux-form';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Button from '../Common/Button';
import InputField from '../Common/InputField';
import { required } from '../../utils/validate';

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

export default class PublishThingForm extends React.Component {
  static propTypes = {
    thingId: PropTypes.string.isRequired,
    edit: PropTypes.bool,
    // from connect
    saveThing: PropTypes.func.isRequired,
    removeThing: PropTypes.func.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    edit: false,
  };

  onSave = (values) => {
    const { thingId, saveThing } = this.props;

    saveThing({ id: thingId, ...values });
    Actions.pop();
  };

  onCancel = () => {
    const { thingId, edit, removeThing } = this.props;

    if (!edit) removeThing(thingId);
    Actions.pop();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.group}>
          <Field name="name" labelText="Название вещи" component={InputField} validate={[required]} required />
          <Field name="brand" labelText="Бренд" component={InputField} inputTextOrange />
          <Field name="price" labelText="Цена" keyboardType="numeric" component={InputField} />
        </View>
        <View style={styles.submit}>
          <Button title="Отменить" onPress={this.onCancel} type="material" />
          <Button title="Сохранить" onPress={handleSubmit(this.onSave)} />
        </View>
      </ScrollView>
    );
  }
}
