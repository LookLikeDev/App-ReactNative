import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import labelSvg from '../../../assets/icons/look/label.svg';
import editSvg from '../../../assets/icons/look/edit.svg';
import removeSvg from '../../../assets/icons/look/remove.svg';

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
  edit: {
    position: 'absolute',
    right: -4,
    bottom: -14,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#00C835',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remove: {
    position: 'absolute',
    right: 32,
    bottom: -14,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class LookLabels extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }).isRequired,
        name: PropTypes.string.isRequired,
        brand: PropTypes.string,
        price: PropTypes.number,
      }),
    ),
    areaWidth: PropTypes.number.isRequired,
    removeThing: PropTypes.func.isRequired,
  };

  renderName = value => (
    <Text style={styles.text}>
      {value}
    </Text>
  );

  renderBrand = value => (
    <Text style={styles.brand}>
      {value}
    </Text>
  );

  renderPrice = value => (
    <Text style={styles.price}>
      {value}
    </Text>
  );

  render() {
    const { items, areaWidth } = this.props;

    return (
      <React.Fragment>
        {items.map((item) => {
          const { removeThing } = this.props;
          const {
            id, name, brand, price, position: { x, y },
          } = item;

          const isLeft = x > (areaWidth / 2);

          const styleHint = [styles.hint, isLeft ? styles.hintLeft : styles.hintRight];
          const styleTriangle = isLeft ? styles.triangleLeft : styles.triangleRight;

          return (
            <TouchableOpacity
              key={id}
              style={[styles.label, { left: x, top: y }]}
              // onPress={() => console.log('mark mark mark mark')}
            >
              <SvgUri
                width="16"
                height="16"
                fill="#FFFFFF"
                source={labelSvg}
              />
              <View style={styleHint}>
                <View style={styleTriangle} />
                {name && this.renderName(name)}
                {brand && this.renderBrand(brand)}
                {price && this.renderPrice(price)}
                <TouchableOpacity onPress={() => Actions.markItems({ thingId: id })} style={styles.edit}>
                  <SvgUri
                    width="14"
                    height="14"
                    fill="#FFFFFF"
                    source={editSvg}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeThing(id)} style={styles.remove}>
                  <SvgUri
                    width="14"
                    height="14"
                    fill="#FFFFFF"
                    source={removeSvg}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </React.Fragment>
    );
  }
}
