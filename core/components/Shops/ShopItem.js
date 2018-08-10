import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  Text, TouchableOpacity, StyleSheet,
} from 'react-native';
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
  orange: {
    color: '#FC4600',
  },
});

export default class ShopItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      discount: PropTypes.shape({
        days: PropTypes.number,
        target_likes: PropTypes.number,
        value: PropTypes.number,
      }).isRequired,
    }).isRequired,
    selected: PropTypes.bool,
    handleSelected: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: false,
  };

  render() {
    const {
      data, selected, handleSelected, data: { name },
    } = this.props;

    return (
      <TouchableOpacity onPress={() => handleSelected(data)} style={styles.item}>
        <Text style={[styles.shop, selected && styles.orange]}>
          {name}
        </Text>
        {selected && (
          <SvgUri
            width="21"
            height="16"
            fill="#FC4600"
            source={check}
          />
        )}
      </TouchableOpacity>
    );
  }
}
