import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Switch,
} from 'react-native';
import Button from '../Common/Button';
import Input from '../Common/InputField';

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
    marginBottom: 24,
    marginHorizontal: 20,
  },
});

export default class PublishForm extends React.Component {
  static propTypes = {
    // from connect
    uploading: PropTypes.bool.isRequired,
    uploaded: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    saveLook: PropTypes.func.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  onSubmit = (values) => {
    const { image, userId, saveLook } = this.props;

    saveLook(userId, image, values);
  };

  renderSwitch = ({
    style, input: {
      onChange, checked, value, ...restInput
    },
  }) => <Switch onChange={() => onChange(!value)} {...restInput} style={style} value={value} />;

  render() {
    const { handleSubmit, uploading, uploaded } = this.props;

    if (uploading) {
      return (
        <Text>
          Loading
        </Text>
      );
    }

    if (uploaded) {
      return (
        <View>
          <Text>
            Лук опубликован
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.text, styles.subTitle]}>
          «Эта информация будет отображаться вместе с вашим луком»
        </Text>
        <Field name="name" labelText="Имя" component={Input} />
        <Field name="birthday" labelText="Дата рождения" component={Input} />
        <Field name="shopName" labelText="Магазин" component={Input} inputTextOrange />
        <Text style={[styles.text, styles.description]}>
          Точное указание магазина является необходимым условием для получения скидки
        </Text>
        <View style={styles.switchGroup}>
          <Text style={styles.switchLabel}>
            Опубликовать анонимно:
          </Text>
          <Field name="publishAnonymous" component={this.renderSwitch} />
        </View>
        <View style={styles.submit}>
          <Button title="Опубликовать LOOK" onPress={handleSubmit(this.onSubmit)} />
        </View>
      </ScrollView>
    );
  }
}
