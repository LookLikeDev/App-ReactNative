import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { View, Text, StyleSheet } from 'react-native';
import check from '../../../assets/icons/check.svg';

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#BCBBC1',
  },
  shop: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
});

export default class ShopItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
  };

  render() {
    const { data: { id, name } } = this.props;
    return (
      <View style={styles.item}>
        <Text style={styles.shop}>
          {name}
        </Text>
        <SvgUri
          width="21"
          height="16"
          fill="#FC4600"
          source={check}
        />
      </View>
    );
  }
}
