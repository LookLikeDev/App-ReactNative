import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import labelSvg from '../../../../assets/icons/look/label.svg';
import percentSvg from '../../../../assets/icons/look/percent.svg';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

const styles = StyleSheet.create({
  label: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  percentIcon: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#00C835',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  hint: {
    zIndex: 2,
    paddingHorizontal: 8,
  },
  text: {
    fontFamily: 'SF-UI-Text-Bold',
    fontSize: 12,
    lineHeight: 14,
    color: '#000000',
  },
});

export default class UserThing extends React.Component {
  static propTypes = {
    counter_likes: PropTypes.number,
    is_discount_reached: PropTypes.bool,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    counter_likes: 0,
    is_discount_reached: false,
  };

  renderHint = () => {
    const { counter_likes: counterLikes = 0 } = this.props;
    return (
      <View style={styles.hint}>
        <Text style={styles.text}>
          {counterLikes}
          {'/'}
          {54}
        </Text>
      </View>
    );
  };

  render() {
    const {
      position: { x, y },
      is_discount_reached: isDiscount = false,
    } = this.props;

    const locationX = Math.round(x * (wrapWidth / 100));
    const locationY = Math.round(y * (wrapHeight / 100));

    const isLeft = x > (100 / 2);

    if (isDiscount) {
      return (
        <View style={[styles.label, { left: locationX, top: locationY }]}>
          <View style={styles.percentIcon}>
            <SvgUri
              width="16"
              height="16"
              fill="#FFFFFF"
              source={percentSvg}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.label, { left: locationX - 18, top: locationY - 18 }]}>
        {isLeft && this.renderHint()}
        <View style={styles.icon}>
          <SvgUri
            width="16"
            height="16"
            fill="#FFFFFF"
            source={labelSvg}
          />
        </View>
        {!isLeft && this.renderHint()}
      </View>
    );
  }
}
