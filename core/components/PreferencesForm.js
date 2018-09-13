import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import { WebBrowser } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import InputField from './Common/InputField';
import SwitchField from './Common/SwitchField';
import DateField from './Common/DateField';
import NativePicker from './Common/Picker';


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
  link: {
    height: 56,
    marginLeft: 20,
    paddingRight: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  linkText: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    color: '#000000',
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
  
  _onPressLink = (url) => {
    WebBrowser.openBrowserAsync(
      url,
    );
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
          {('Личные данные').toUpperCase()}
        </Text>
        <View style={styles.dataGroup}>
          <Field
            name="name"
            labelText="Имя"
            component={InputField}
            handleChange={handleSubmit(this.onPreferencesChange)}
          />
          <Field
            name="birthday"
            labelText="Дата рождения"
            component={DateField}
            handleChange={handleSubmit(this.onPreferencesChange)}
          />
          <Text style={[styles.text, styles.description]}>
            Ваши имя и возраст будут показываться другим пользователям вместе с вашими образами
          </Text>
          <Field
            name="is_female"
            labelText="Пол"
            component={NativePicker}
            handleChange={handleSubmit(this.onPreferencesChange)}
            items={[
              {
                label: 'Не указан',
                value: null,
              },
              {
                label: 'Мужской',
                value: false,
              },
              {
                label: 'Женский',
                value: true,
              },
            ]}
            // fix cause redux-form automaticly convert null to empty string O_o wtf
            format={value => (value === '' ? null : value)}
          />
        </View>
        <View>
          <Text style={styles.dataGroupTitle}>
            {('Информация').toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this._onPressLink('https://look-like-dev.firebaseapp.com/download/privacy_policy_mobile_view.pdf')}>
          <View style={styles.link}>
            <Text style={styles.linkText}>
              Политика конфиденциальности
            </Text>
            <MaterialIcons name="navigate-next" size={26} color="#A1A1A1" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._onPressLink('https://look-like-dev.firebaseapp.com/download/EULA_mobile_view.pdf')}>
          <View style={styles.link}>
            <Text style={styles.linkText}>
              Правила использования приложения
            </Text>
            <MaterialIcons name="navigate-next" size={26} color="#A1A1A1" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
