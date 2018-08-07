import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import main from '../../../assets/icons/tabbar/main.svg';
import favorites from '../../../assets/icons/tabbar/favorites.svg';
import camera from '../../../assets/icons/tabbar/camera.svg';
import looks from '../../../assets/icons/tabbar/looks.svg';
import discounts from '../../../assets/icons/tabbar/discounts.svg';

function getIconSource(type) {
  switch (type) {
    case 'main':
      return main;
    case 'favorites':
      return favorites;
    case 'camera':
      return camera;
    case 'looks':
      return looks;
    case 'discounts':
      return discounts;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    flex: 1,
    top: -14,
    right: -14,
    borderRadius: 26,
    width: 26,
    height: 26,
    backgroundColor: '#FC4600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    color: 'white',
    fontSize: 14,
    lineHeight: 26,
    textAlign: 'center',
  },
});

export default class TabIcon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    showCount: PropTypes.bool,
    // from connect
    count: PropTypes.number,
  };

  static defaultProps = {
    showCount: false,
    count: 0,
  };

  render() {
    const {
      type, showCount, selected, count,
    } = this.props;

    return (
      <View>
        <SvgUri
          width="24"
          height="24"
          fill={selected ? '#000000' : '#A1A1A1'}
          source={getIconSource(type)}
        />
        {showCount && count > 0
        && (
        <View style={styles.badge}>
          <Text style={styles.count}>
            {count}
          </Text>
        </View>
        )}
      </View>
    );
  }
}
