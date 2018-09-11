import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Field } from 'redux-form';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { firestore } from '../../../config';
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
  validateText: {
    fontFamily: 'SF-UI-Text-Regular',
    color: '#FC4600',
    fontSize: 16,
    marginHorizontal: 20,
  },
  required: {
    color: '#FC4600',
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
    discount: PropTypes.shape({
      days: PropTypes.number,
      target_likes: PropTypes.number,
      value: PropTypes.number,
    }),
    saveLook: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    discount: null,
  };

  state = {
    submitPressed: false,
  };

  onSubmit = (values) => {
    const {
      image, userId, shop, discount, saveLook, setUserInfo,
    } = this.props;

    this.setState({
      submitPressed: true,
    });

    if (shop && shop.name && shop.name.length > 0) {
      setUserInfo(values.name || null, values.birthday || null);
      saveLook(userId, image, values, shop, discount);
    }
  };

  isUserBlocked = async () => {
    const { userId } = this.props;
    const userRef = await firestore.collection('users').doc(userId);
    window.data = userRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data && data.is_blocked) {
          console.log('return data.is_blocked;', data.is_blocked);
          return !data.is_blocked;
        }
        return true;
      }
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
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
    const {
      shop, handleSubmit, uploading, uploaded,
    } = this.props;
    const { submitPressed } = this.state;

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
        Эта информация будет отображаться вместе с вашим луком
        </Text>
        <Field name="name" labelText="Имя" component={InputField} />
        <Field name="birthday" labelText="Дата рождения" component={DateField} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
          Магазин:

            {' '}
            <Text style={styles.required}>
            *

            </Text>
          </Text>
          <TouchableOpacity
            style={styles.shopWrap}
            onPress={() => Actions.shopList({ shop })}
          >
            <Text style={[styles.inputText, styles.orange]}>
              {shop.name}
            </Text>
          </TouchableOpacity>
        </View>
        {submitPressed && !shop.name ? (
          <Text style={styles.validateText}>
          Название магазина обязательно для заполнения
          </Text>
        ) : null}
        <Text style={[styles.text, styles.description]}>
        Точное указание магазина является необходимым условием для получения
        скидки
        </Text>
        <View style={styles.switchGroup}>
          <Text style={styles.switchLabel}>
          Опубликовать анонимно:
          </Text>
          <Field name="publishAnonymous" component={this.renderSwitch} />
        </View>
        <View style={styles.submit}>
          <Button
            title="Опубликовать LOOK"
            onPress={() => {
              this.isUserBlocked() && handleSubmit(this.onSubmit);
            }
          }
          />
        </View>
      </ScrollView>
    );
  }
}
