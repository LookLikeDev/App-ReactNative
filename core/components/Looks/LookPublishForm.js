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
import { Actions } from 'react-native-router-flux';
import Button from '../Button';

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
  switchGroup: {
    paddingVertical: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    lineHeight: 16,
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
  switchLabel: {
    fontFamily: 'SF-Pro-Display-Semibold',
    fontSize: 16,
    color: '#000000',
  },
  orange: {
    color: '#FC4600',
  },
  submit: {
    marginBottom: 24,
  },
});

export default class LookPublishForm extends React.Component {
  static propTypes = {
    // from connect
    uploading: PropTypes.bool.isRequired,
    uploaded: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    image: PropTypes.shape({
      uri: PropTypes.string,
      data: PropTypes.string,
      origURL: PropTypes.string,
      fileName: PropTypes.string,
    }).isRequired,
    uploadImage: PropTypes.func.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  onSubmit = (values) => {
    const { image, userId, uploadImage } = this.props;
    console.log('submitting form', values);
    uploadImage(userId, image, values);
  };

  renderInput = ({ style, input: { onChange, ...restInput } }) => <TextInput onChangeText={onChange} {...restInput} style={style} />;

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

    if (false) {
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
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Имя:
          </Text>
          <Field name="name" component={this.renderInput} style={styles.inputText} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Дата рождения:
          </Text>
          <Field name="birthday" component={this.renderInput} style={styles.inputText} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            Магазин:
          </Text>
          <Field name="shopName" component={this.renderInput} style={[styles.inputText, styles.orange]} />
        </View>
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
