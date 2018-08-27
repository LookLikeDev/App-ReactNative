import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Pan from '../Common/Pan';
import labelSvg from '../../../assets/icons/look/label.svg';
import editSvg from '../../../assets/icons/look/edit.svg';
import removeSvg from '../../../assets/icons/look/remove.svg';

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

const hitSlopSmall = {
  top: 5,
  left: 5,
  bottom: 5,
  right: 5,
};

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

// [ширина экрана / 2] - [половина ширины label] - [отступ hint] - [margin от края экрана]
const maxWidth = Math.round((wrapWidth / 2) - 18 - 16 - 20);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 14,
  },
  label: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  hint: {
    position: 'relative',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    zIndex: 3,
    paddingBottom: 14,
    minWidth: maxWidth < 160 ? maxWidth : 160,
    maxWidth,
  },
  hintLeft: {
    marginRight: 14,
  },
  hintRight: {
    marginLeft: 14,
  },
  triangleLeft: {
    position: 'absolute',
    top: (36 / 2) - 4,
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
  triangleRight: {
    position: 'absolute',
    top: (36 / 2) - 4, // [label height / 2 - (triangle width / 2)]
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
    right: 0,
    bottom: 0,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#00C835',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  remove: {
    position: 'absolute',
    right: 36,
    bottom: 0,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
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
        name: PropTypes.string,
        brand: PropTypes.string,
        price: PropTypes.number,
      }),
    ),
    onDragBegin: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    removeThing: PropTypes.func.isRequired,
    updateThing: PropTypes.func.isRequired,
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

  renderLeft = (item) => {
    const {
      removeThing, updateThing, onDragBegin, onDragEnd,
    } = this.props;

    const {
      id, name, brand, price, position: { x, y },
    } = item;

    const locationX = Math.round(x * (wrapWidth / 100));
    const locationY = Math.round(y * (wrapHeight / 100));

    return (
      <Pan
        key={`left_${id}`}
        id={id}
        onDragBegin={onDragBegin}
        onDragEnd={onDragEnd}
        updateThing={updateThing}
        initialCoordinates={{
          x: locationX,
          y: locationY,
        }}
      >
        <View style={styles.wrap}>
          <View style={styles.label}>
            <SvgUri
              width="16"
              height="16"
              fill="#FFFFFF"
              source={labelSvg}
            />
          </View>
          <View style={[styles.hint, styles.hintRight]}>
            <View style={styles.triangleLeft} />
            {name ? this.renderName(name) : null}
            {brand ? this.renderBrand(brand) : null}
            {price ? this.renderPrice(price) : null}
          </View>
          <TouchableOpacity
            onPressIn={() => { Actions.describeItem({ thingId: id, edit: true }); }}
            hitSlop={hitSlopSmall}
            style={styles.edit}
          >
            <SvgUri
              width="14"
              height="14"
              fill="#FFFFFF"
              source={editSvg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => removeThing(id)}
            hitSlop={hitSlopSmall}
            style={styles.remove}
          >
            <SvgUri
              width="14"
              height="14"
              fill="#FFFFFF"
              source={removeSvg}
            />
          </TouchableOpacity>
        </View>
      </Pan>
    );
  };

  renderRight = (item) => {
    const {
      removeThing, updateThing, onDragBegin, onDragEnd,
    } = this.props;

    const {
      id, name, brand, price, position: { x, y },
    } = item;

    // Формула подсчета иная так как вместо координаты left используется right
    const locationX = Math.round(x * (wrapWidth / 100));
    const locationY = Math.round(y * (wrapHeight / 100));

    return (
      <Pan
        key={`right_${id}`}
        id={id}
        onDragBegin={onDragBegin}
        onDragEnd={onDragEnd}
        updateThing={updateThing}
        initialCoordinates={{
          x: locationX,
          y: locationY,
        }}
        renderRTL
      >
        <View style={styles.wrap}>
          <View style={[styles.hint, styles.hintLeft]}>
            <View style={styles.triangleRight} />
            {name ? this.renderName(name) : null}
            {brand ? this.renderBrand(brand) : null}
            {price ? this.renderPrice(price) : null}
          </View>
          <View style={styles.label}>
            <SvgUri
              width="16"
              height="16"
              fill="#FFFFFF"
              source={labelSvg}
            />
          </View>
          {/* EDIT */}
          <TouchableOpacity
            onPressIn={() => Actions.describeItem({ thingId: id, edit: true })}
            hitSlop={hitSlopSmall}
            style={[styles.edit, { right: 36 + 16 }]}
          >
            <SvgUri
              width="14"
              height="14"
              fill="#FFFFFF"
              source={editSvg}
            />
          </TouchableOpacity>
          {/* REMOVE */}
          <TouchableOpacity
            onPressIn={() => removeThing(id)}
            hitSlop={hitSlopSmall}
            style={[styles.remove, { right: 36 + 16 + 36 }]}
          >
            <SvgUri
              width="14"
              height="14"
              fill="#FFFFFF"
              source={removeSvg}
            />
          </TouchableOpacity>
        </View>
      </Pan>
    );
  };

  renderItem = (item) => {
    const { name, position: { x } } = item;

    const isLeft = x < (100 / 2);

    if (!name) return null;

    return isLeft ? this.renderLeft(item) : this.renderRight(item);
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
