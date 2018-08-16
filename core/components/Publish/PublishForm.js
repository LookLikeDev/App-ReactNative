import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Field } from 'redux-form';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Button from '../Common/Button';
import InputField from '../Common/InputField';
import DateField from '../Common/DateField';

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
  label: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    color: '#A1A1A1',
    paddingRight: 6,
  },
  shopWrap: {
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
  subTitle: {
    marginBottom: 12,
  },
  description: {
    paddingTop: 12,
    marginBottom: 20,
  },
  switchGroup: {
    paddingVertical: 5,
    marginHorizontal: 20,
    marginBottom: 20,
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
    shop: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    // from connect
    uploading: PropTypes.bool.isRequired,
    uploaded: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    saveLook: PropTypes.func.isRequired,
    discount: PropTypes.shape({
      days: PropTypes.number,
      target_likes: PropTypes.number,
      value: PropTypes.number,
    }),
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    discount: null,
  };

  onSubmit = (values) => {
    const {
      image, userId, shop, discount, saveLook,
    } = this.props;

    saveLook(userId, image, values, shop, discount);
  };

  renderSwitch = ({
    style, input: {
      onChange, checked, value, ...restInput
    },
  }) => <Switch onChange={() => onChange(!value)} {...restInput} style={style} value={value} />;


  render() {
    const {
      shop, handleSubmit, uploading, uploaded,
    } = this.props;

    if (uploading) {
      return (
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <View style={{ marginBottom: 26 }}>
            <ActivityIndicator animating size="large" />
          </View>
        </View>
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
        <Field name="name" labelText="Имя" component={InputField} />
        <Field name="birthday" labelText="Дата рождения" component={DateField} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Магазин:
          </Text>
          <TouchableOpacity style={styles.shopWrap} onPress={() => Actions.shopList({ shop })}>
            <Text style={[styles.inputText, styles.orange]}>
              {shop.name}
            </Text>
          </TouchableOpacity>
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
