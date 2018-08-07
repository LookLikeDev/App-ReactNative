import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Switch,
} from 'react-native';
import Button from './Common/Button';
import Input from './Common/Input';

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
  subTitle: {
    marginBottom: 12,
  },
  description: {
    paddingTop: 12,
    marginBottom: 20,
  },
  dataGroup: {
    paddingBottom: 24,
  },
  dataGroupTitle: {
    fontSize: 11,
    lineHeight: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontFamily: 'SF-UI-Text-Semibold',
    color: '#000000',
    backgroundColor: '#EBEBEB',
  },
  switchGroup: {
    paddingVertical: 16,
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
  submit: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
});

export default class PreferencesForm extends React.Component {
  static propTypes = {
    // from connect
    updateUserInfo: PropTypes.func.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  onPreferencesChange = (values) => {
    const { updateUserInfo } = this.props;

    updateUserInfo(values);
  };

  renderSwitch = ({
    style, input: {
      onChange, checked, value, ...restInput
    },
  }) => (
    <Switch
      onChange={() => onChange(!value)}
      {...restInput}
      style={style}
      value={value}
    />
  );

  render() {
    const { handleSubmit } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.dataGroupTitle}>
          {('личные данные').toUpperCase()}
        </Text>
        <View style={styles.dataGroup}>
          <Field name="name" labelText="Имя" component={Input} handleChange={handleSubmit(this.onPreferencesChange)} />
          <Field name="birthday" labelText="Дата рождения" component={Input} handleChange={handleSubmit(this.onPreferencesChange)} />
          <Field name="is_female" labelText="Пол" component={Input} handleChange={handleSubmit(this.onPreferencesChange)} />
          <Text style={[styles.text, styles.description]}>
            Ваши имя и возраст будут показываться другим пользователям вместе с вашими образами
          </Text>
          <View style={styles.switchGroup}>
            <Text style={styles.switchLabel}>
              Опубликовать анонимно:
            </Text>
            <Field name="publishAnonymous" component={this.renderSwitch} />
          </View>
          <View style={styles.submit}>
            <Button title="Опубликовать LOOK" onPress={handleSubmit(this.onPreferencesChange)} />
          </View>
        </View>
      </ScrollView>
    );
  }
}
