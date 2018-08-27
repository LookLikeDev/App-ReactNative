import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';
import labelSvg from '../../../../assets/icons/look/label.svg';
import likeSvg from '../../../../assets/icons/look/like.svg';
import cancelSvg from '../../../../assets/icons/look/cancel.svg';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

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

// [ширина экрана / 2] - [половина ширины label] - [отступ hint] - [margin от края экрана]
const maxWidth = Math.round((wrapWidth / 2) - 18 - 16 - 20);

// TODO сделать координаты hint и label одинаковые и позицианировать hint с помощью margin
const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 2,
    // width: 36 + 16 + (maxWidth > 160 ? maxWidth : 160),
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
  cancel: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  hint: {
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
    marginRight: 16,
  },
  hintRight: {
    marginLeft: 16,
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
  like: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#00C835',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  dislike: {
    position: 'absolute',
    right: 36,
    bottom: 0,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
});

export default class FavoriteThing extends React.Component {
  static propTypes = {
    lookId: PropTypes.string.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string,
      price: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }).isRequired,
    // from connect
    userId: PropTypes.string.isRequired,
    voting: PropTypes.bool.isRequired,
    addVote: PropTypes.func.isRequired,
    thingVote: PropTypes.func.isRequired,
    isVoted: PropTypes.bool,
    isLike: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isVoted: false,
  };

  state = {
    isOpen: true,
    isShowLike: true,
    isShowDislike: true,
  };

  handleVote = (isLike) => {
    const {
      item: { id }, lookId, userId, voting, isVoted, addVote, thingVote,
    } = this.props;

    if (!voting && !isVoted) {
      addVote(id, lookId, isLike);
      thingVote(id, lookId, userId, isLike);

      if (isLike) {
        this.setState({
          isShowDislike: false,
        });
      } else {
        this.setState({
          isShowLike: false,
        });
      }
    }
  };

  renderIcon = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      return (
        <SvgUri
          width="10"
          height="10"
          fill="#FFFFFF"
          source={cancelSvg}
        />
      );
    }

    return (
      <SvgUri
        width="16"
        height="16"
        fill="#FFFFFF"
        source={labelSvg}
      />
    );
  };

  renderLike = (isRightMark) => {
    const { isVoted, isLike } = this.props;

    if (isVoted && !isLike) return null;

    if (isVoted && isLike) {
      return (
        <View style={[styles.like, isRightMark && { right: 36 + 16 }]}>
          <SvgUri
            width="14"
            height="14"
            fill="#FFFFFF"
            source={likeSvg}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        hitSlop={hitSlopSmall}
        onPress={() => this.handleVote(true)}
        style={[styles.like, isRightMark && { right: 36 + 16 }]}
      >
        <View>
          <SvgUri
            width="14"
            height="14"
            fill="#FFFFFF"
            source={likeSvg}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderDislike = (isRightMark) => {
    const { isVoted, isLike } = this.props;

    if (isVoted && isLike) return null;

    if (isVoted && !isLike) {
      return (
        <View style={[
          styles.dislike,
          isRightMark && { right: 36 + 16 + 36 },
          { transform: [{ rotate: '180deg' }] },
        ]}
        >
          <SvgUri
            width="14"
            height="14"
            fill="#FFFFFF"
            source={likeSvg}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.dislike, isRightMark && { right: 36 + 16 + 36 }]}
        onPress={() => this.handleVote(false)}
        hitSlop={hitSlopSmall}
      >
        <View style={{ transform: [{ rotate: '180deg' }] }}>
          <SvgUri
            width="14"
            height="14"
            fill="#FFFFFF"
            source={likeSvg}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderLeft = () => {
    const {
      item: {
        name, brand, price, position: { x, y },
      },
    } = this.props;
    const { isOpen, isShowLike, isShowDislike } = this.state;

    const locationX = Math.round(x * (wrapWidth / 100));
    const locationY = Math.round(y * (wrapHeight / 100));

    return (
      <View style={[styles.wrap, { left: locationX - 18, top: locationY - 18, paddingRight: 4 }]}>
        <TouchableOpacity
          style={[isOpen ? styles.cancel : styles.label]}
          hitSlop={hitSlop}
          onPressIn={() => this.setState({ isOpen: !isOpen })}
        >
          {this.renderIcon()}
        </TouchableOpacity>
        {isOpen ? (
          <View style={[styles.hint, styles.hintRight]}>
            <View style={styles.triangleLeft} />
            {name
              ? (
                <Text style={styles.text}>
                  {name}
                </Text>
              )
              : null}
            {brand ? (
              <Text style={styles.brand}>
                {brand}
              </Text>
            ) : null}
            {price ? (
              <Text style={styles.price}>
                {price}
                {' '}
                руб.
              </Text>
            ) : null}
          </View>
        ) : null}
        {isOpen && isShowLike ? this.renderLike() : null}
        {isOpen && isShowDislike ? this.renderDislike() : null}
      </View>
    );
  };

  renderRight = () => {
    const {
      item: {
        name, brand, price, position: { x, y },
      },
    } = this.props;
    const { isOpen, isShowLike, isShowDislike } = this.state;

    // Формула подсчета иная так как вместо координаты left используется right
    const locationX = Math.round(wrapWidth - (x * (wrapWidth / 100)));
    const locationY = Math.round(y * (wrapHeight / 100));

    return (
      <View style={[styles.wrap, { right: locationX - 18, top: locationY - 18 }]}>
        {isOpen ? (
          <View style={[styles.hint, styles.hintLeft]}>
            <View style={styles.triangleRight} />
            {name
              ? (
                <Text style={styles.text}>
                  {name}
                </Text>
              )
              : null}
            {brand ? (
              <Text style={styles.brand}>
                {brand}
              </Text>
            ) : null}
            {price ? (
              <Text style={styles.price}>
                {price}
                {' '}
                руб.
              </Text>
            ) : null}
          </View>
        ) : null}
        {isOpen && isShowLike ? this.renderLike(true) : null}
        {isOpen && isShowDislike ? this.renderDislike(true) : null}
        <TouchableOpacity
          style={[isOpen ? styles.cancel : styles.label]}
          hitSlop={hitSlop}
          onPressIn={() => this.setState({ isOpen: !isOpen })}
        >
          {this.renderIcon()}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {
      item: {
        position: { x },
      },
    } = this.props;

    const isLeft = x < (100 / 2);

    return isLeft ? this.renderLeft() : this.renderRight();
  }
}
