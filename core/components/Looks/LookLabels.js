import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import labelSvg from '../../../assets/icons/look/label.svg';

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: 'absolute',
    width: 160,
    backgroundColor: '#FFFFFF',
  },
  hintLeft: {
    top: 0,
    right: 52,
  },
  hintRight: {
    top: 0,
    left: 52,
  },
  triangleLeft: {
    position: 'absolute',
    top: 14,
    right: -8,
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFFFFF',
  },
  triangleRight: {
    position: 'absolute',
    top: 14,
    left: -8,
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 14,
  },
  brand: {
    fontFamily: 'SF-UI-Text-Bold',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 4,
  },
  price: {
    fontFamily: 'SF-UI-Text-Bold',
    color: '#000000',
    fontSize: 13,
  },
});

export default class LookLabels extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        locationX: PropTypes.number.isRequired,
        locationY: PropTypes.number.isRequired,
      }),
    ),
    areaWidth: PropTypes.number.isRequired,
  };

  static defaultProps = {
    items: null,
  };

  // TODO refactor likes and dislikes, like component
  render() {
    const { items, areaWidth } = this.props;

    return (
      <React.Fragment>
        {items.map((item) => {
          const { id, locationX, locationY } = item;
          const isLeft = locationX > (areaWidth / 2);

          const styleHint = [styles.hint, isLeft ? styles.hintLeft : styles.hintRight];
          const styleTriangle = isLeft ? styles.triangleLeft : styles.triangleRight;

          return (
            <TouchableOpacity
              key={id}
              style={[styles.label, { left: locationX, top: locationY }]}
              onPress={() => console.log('mark mark mark mark')}
            >
              <SvgUri
                width="16"
                height="16"
                fill="#FFFFFF"
                source={labelSvg}
              />
              <View style={styleHint}>
                <View style={styleTriangle} />
                <Text style={styles.text}>
                  Платье с принтом
                </Text>
                <Text style={styles.brand}>
                  «Zara»
                </Text>
                <Text style={styles.price}>
                  12 600 руб.
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </React.Fragment>
    );
  }
}
