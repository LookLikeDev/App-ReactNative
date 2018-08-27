import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';

const dimensions = Dimensions.get('window');
const wrapWidth = dimensions.width;

const styles = StyleSheet.create({
  date: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
    alignSelf: 'flex-start',
    backgroundColor: '#00C835',
  },
  dateText: {
    fontFamily: 'SF-UI-Text-Semibold',
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 16,
  },
  dateDisabled: {
    backgroundColor: '#EBEBEB',
    opacity: 0.5,
  },
  dateTextDisabled: {
    color: '#000000',
  },
  group: {
    marginBottom: 16,
  },
  groupLast: {
    marginBottom: 24,
  },
  desc: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'SF-UI-Text-Regular',
    color: '#8A8A8F',
    fontSize: 13,
    lineHeight: 18,
  },
  barcodeTitle: {
    color: '#000000',
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
    textAlign: 'center',
  },
  barcodeDesc: {
    fontFamily: 'SF-UI-Text-Regular',
    color: '#000000',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  barcode: {
    fontFamily: 'Barcode-128',
    fontSize: 200, // auto scale font size for width
    width: wrapWidth - (20 * 2),
  },
});

export default class PromoCode extends React.Component {
  static propTypes = {
    // from connect
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
      promocode: PropTypes.shape({
        value: PropTypes.string.isRequired,
        type: PropTypes.string,
      }),
    }).isRequired,
  };

  renderPromoCode = () => {
    const { data: { promocode: { value } } } = this.props;

    if (!value) return null;

    return (
      <View>
        <Text style={styles.barcodeTitle}>
          Отсканируйте ваш код
        </Text>
        <Text style={styles.barcodeDesc}>
          Покажите код продавцу в магазине
        </Text>
        <Text
          style={styles.barcode}
          numberOfLines={1}
          minimumFontScale={0.01}
          adjustsFontSizeToFit
        >
          {value}
        </Text>
      </View>
    );
  };

  render() {
    const {
      data: {
        value, shop, item, date_expiration: dateExpiration, is_applied: isApplied,
      },
    } = this.props;

    const dateEnd = dateExpiration.toDate();
    const dateNow = new Date();

    const isDisabled = (dateEnd.getTime() < dateNow.getTime()) || isApplied;

    return (
      <React.Fragment>
        <View style={[styles.date, isDisabled && styles.dateDisabled]}>
          <Text style={[styles.dateText, isDisabled && styles.dateTextDisabled]}>
            до
            {' '}
            {dateEnd.toLocaleDateString('ru-RU')}
          </Text>
        </View>
        {/* {-- Discount --} */}
        <View style={styles.group}>
          <Text style={styles.desc}>
            {value && `${value}%`}
          </Text>
          <Text style={styles.title}>
            Размер скидки
          </Text>
        </View>
        {/* {-- Shop --} */}
        <View style={styles.group}>
          <Text style={styles.desc}>
            {shop && shop.name && shop.name}
            {shop && shop.address && ` / ${shop.address}`}
          </Text>
          <Text style={styles.title}>
            Магазин
          </Text>
        </View>
        {/* {-- Thing --} */}
        <View style={styles.groupLast}>
          <Text style={styles.desc}>
            {item && item.name && item.name}
            {item && item.brand && ` / ${item.brand}`}
            {item && item.price && ` / ${item.price} руб.`}
          </Text>
          <Text style={styles.title}>
            Название вещи
          </Text>
        </View>
        {this.renderPromoCode()}
        { /*
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
              </Text>
              <Text style={[styles.desk, isDisabled && styles.deskDisabled]}>
                {item && item.name && item.name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        */ }
      </React.Fragment>
    );
  }
}
