import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import main from '../../assets/tabbar/main.png';
import favorites from '../../assets/tabbar/favorites.png';
import camera from '../../assets/tabbar/camera.png';
import looks from '../../assets/tabbar/looks.png';
import discounts from '../../assets/tabbar/discounts.png';

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

export default class TabIcon extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };

  render() {
    const { type } = this.props;
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
      </View>
    );
  }
}
