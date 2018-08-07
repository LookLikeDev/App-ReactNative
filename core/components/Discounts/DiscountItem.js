import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  render() {
    return (
      <React.Fragment>
        {/* EXAMPLE ACTIVE */}
        <View style={styles.item}>
          <View style={styles.percentWrap}>
            <Text style={styles.percentText}>
              30%
            </Text>
          </View>
          <View style={styles.info}>
            <View style={styles.date}>
              <Text style={styles.dateText}>
                {('до 12.08.2018').toUpperCase()}
              </Text>
            </View>
            <Text style={styles.shop}>
              Zara «ТЦ Ультра / Уфа»
            </Text>
            <Text style={styles.desk}>
              На топ с вырезом халтер
            </Text>
          </View>
          <View />
        </View>
        {/* EXAMPLE DISABLED */}
        <View style={styles.item}>
          <View style={[styles.percentWrap, styles.percentWrapDisabled]}>
            <Text style={[styles.percentText, styles.percentTextDisabled]}>
              30%
            </Text>
          </View>
          <View style={styles.info}>
            <View style={[styles.date, styles.dateDisabled]}>
              <Text style={[styles.dateText, styles.dateTextDisabled]}>
                до 12.08.2018
              </Text>
            </View>
            <Text style={[styles.shop, styles.shopDisabled]}>
              Zara «ТЦ Ультра / Уфа»
            </Text>
            <Text style={[styles.desk, styles.deskDisabled]}>
              На топ с вырезом халтер
            </Text>
          </View>
          <View />
        </View>
      </React.Fragment>
    );
  }
}