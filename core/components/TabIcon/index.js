import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

import main from '../../../assets/icons/tabbar/main.svg';
import favorites from '../../../assets/icons/tabbar/favorites.svg';
import camera from '../../../assets/icons/tabbar/camera.svg';
import looks from '../../../assets/icons/tabbar/looks.svg';
import discounts from '../../../assets/icons/tabbar/discounts.svg';

import Badge from '../../containers/Badge';

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
    selected: PropTypes.bool.isRequired,
    showCount: PropTypes.bool,
  };

  static defaultProps = {
    showCount: false,
  };

  render() {
    const { type, showCount, selected } = this.props;

    return (
      <View>
        <SvgUri
          width="24"
          height="24"
          fill={selected ? '#000000' : '#A1A1A1'}
          source={getIconSource(type)}
        />
        {showCount && <Badge />}
      </View>
    );
  }
}
