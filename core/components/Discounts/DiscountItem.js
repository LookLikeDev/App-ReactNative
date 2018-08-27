import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  View, Text, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 24,
  },
  percentWrap: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  percentWrapDisabled: {
    opacity: 0.5,
    backgroundColor: '#EBEBEB',
  },
  percentText: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  percentTextDisabled: {
    color: '#000000',
  },
  info: {
    flex: 1,
  },
  date: {
    backgroundColor: '#00C835',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  dateDisabled: {
    backgroundColor: '#EBEBEB',
    opacity: 0.5,
  },
  dateText: {
    fontFamily: 'SF-UI-Text-Semibold',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  dateTextDisabled: {
    color: '#000000',
  },
  shop: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    marginBottom: 4,
  },
  shopDisabled: {
    opacity: 0.5,
  },
  desk: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#8A8A8F',
  },
  deskDisabled: {
    color: '#BCBBC1',
    opacity: 0.5,
  },
});

export default class DiscountItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      look_id: PropTypes.string,
      is_applied: PropTypes.bool.isRequired,
      value: PropTypes.number.isRequired,
      date_issued: PropTypes.object.isRequired,
      date_expiration: PropTypes.object.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        brand: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      shop: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string,
      }),
    }).isRequired,
  };

  render() {
    const {
      data: {
        id, value, shop, item, date_expiration: dateExpiration, is_applied: isApplied,
      },
    } = this.props;
    console.log(this.props.data.shop);
    const dateEnd = dateExpiration.toDate();
    const dateNow = new Date();

    const isDisabled = (dateEnd.getTime() < dateNow.getTime()) || isApplied;

    return (
      <TouchableWithoutFeedback onPress={() => Actions.discountsDetail({ discountId: id })}>
        <View style={styles.item}>
          <View style={[styles.percentWrap, isDisabled && styles.percentWrapDisabled]}>
            <Text style={[styles.percentText, isDisabled && styles.percentTextDisabled]}>
              {value && `${value}%`}
            </Text>
          </View>
          <View style={styles.info}>
            <View style={[styles.date, isDisabled && styles.dateDisabled]}>
              <Text style={[styles.dateText, isDisabled && styles.dateTextDisabled]}>
                до
                {' '}
                {dateEnd.toLocaleDateString('ru-RU')}
              </Text>
            </View>
            <Text style={[styles.shop, isDisabled && styles.shopDisabled]}>
              {shop && shop.name && shop.name}
              {shop && shop.address && ` / ${shop.address}`}
            </Text>
            <Text style={[styles.desk, isDisabled && styles.deskDisabled]}>
              {item && item.name && item.name}
              {item && item.brand && ` / ${item.brand}`}
              {item && item.price && ` / ${item.price} руб.`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
