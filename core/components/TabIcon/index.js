import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';
import main from '../../../assets/icons/tabbar/main.png';
import favorites from '../../../assets/icons/tabbar/favorites.png';
import camera from '../../../assets/icons/tabbar/camera.png';
import looks from '../../../assets/icons/tabbar/looks.png';
import discounts from '../../../assets/icons/tabbar/discounts.png';

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
    top: -12,
    right: -12,
    borderRadius: 24,
    width: 24,
    height: 24,
    backgroundColor: '#FC4600',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: 'white',
    fontSize: 14,
  },
});

export default class TabIcon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number,
  };

  static defaultProps = {
    count: null,
  };

  render() {
    const { type, count } = this.props;
    return (
      <View>
        <Image
          style={{
            width: 24,
            height: 24,
            resizeMode: Image.resizeMode.contain,
          }}
          source={getIconSource(type)}
        />
        {count && count > 0 && (
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
