import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import labelSvg from '../../../assets/icons/look/label.svg';
import editSvg from '../../../assets/icons/look/edit.svg';
import removeSvg from '../../../assets/icons/look/remove.svg';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  hint: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: 'absolute',
    width: 160,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
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

export default class PublishThings extends React.Component {
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
    removeThing: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
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
      {' '}
      руб.
    </Text>
  );

  renderItem = (item) => {
    const { removeThing } = this.props;
    const {
      id, name, brand, price, position: { x, y },
    } = item;

    // The values are stored in percentages and need to be converted to a device.
    const locationX = Math.round(x * (wrapWidth / 100));
    const locationY = Math.round(y * (wrapHeight / 100));

    const isLeft = x > (100 / 2);

    const styleHint = [styles.hint, isLeft ? styles.hintLeft : styles.hintRight];
    const styleTriangle = isLeft ? styles.triangleLeft : styles.triangleRight;

    return (
      <View
        key={id}
        style={[styles.label, { left: locationX - 18, top: locationY - 18 }]}
        // onPress={() => console.log('mark mark mark mark')}
      >
        <SvgUri
          width="16"
          height="16"
          fill="#FFFFFF"
          source={labelSvg}
        />
        {name
        && (
          <View style={styleHint}>
            <View style={styleTriangle} />
            {name && this.renderName(name)}
            {brand && this.renderBrand(brand)}
            {price && this.renderPrice(price)}
            <TouchableOpacity
              onPress={() => Actions.markItems({ thingId: id })}
              style={styles.edit}
            >
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
        )}
      </View>
    );
  };

  render() {
    const { items } = this.props;

    return (
      <React.Fragment>
        {items.map(item => this.renderItem(item))}
      </React.Fragment>
    );
  }
}
