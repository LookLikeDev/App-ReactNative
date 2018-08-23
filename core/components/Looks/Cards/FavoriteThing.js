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
  cancel: {
    position: 'absolute',
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
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    zIndex: 3,
    width: 160,
    maxWidth,
  },
  hintLeft: {
    top: 0,
    right: 36 + 16,
  },
  hintRight: {
    top: 0,
    left: 36 + 16,
  },
  triangleLeft: {
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
  triangleRight: {
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
    right: -4,
    bottom: -14,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#00C835',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dislike: {
    position: 'absolute',
    right: 32,
    bottom: -14,
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    backgroundColor: '#FC4600',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }],
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

  renderLike = () => {
    const { isVoted, isLike } = this.props;

    if (isVoted && !isLike) return null;

    if (isVoted && isLike) {
      return (
        <View style={styles.like}>
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
      <TouchableOpacity hitSlop={hitSlopSmall} onPress={() => this.handleVote(true)} style={styles.like}>
        <SvgUri
          width="14"
          height="14"
          fill="#FFFFFF"
          source={likeSvg}
        />
      </TouchableOpacity>
    );
  };

  renderDislike = () => {
    const { isVoted, isLike } = this.props;

    if (isVoted && isLike) return null;

    if (isVoted && !isLike) {
      return (
        <View style={styles.dislike}>
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
      <TouchableOpacity hitSlop={hitSlopSmall} onPress={() => this.handleVote(false)} style={styles.dislike}>
        <SvgUri
          width="14"
          height="14"
          fill="#FFFFFF"
          source={likeSvg}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      item: {
        name, brand, price, position: { x, y },
      },
    } = this.props;
    const { isOpen, isShowLike, isShowDislike } = this.state;

    const locationX = Math.round(x * (wrapWidth / 100));
    const locationY = Math.round(y * (wrapHeight / 100));

    const isLeft = x > (100 / 2);

    const styleWrap = [isOpen ? styles.cancel : styles.label, { left: locationX - 18, top: locationY - 18 }];
    const styleHint = [styles.hint, isLeft ? styles.hintLeft : styles.hintRight];
    const styleTriangle = isLeft ? styles.triangleLeft : styles.triangleRight;

    return (
      <View style={styleWrap}>
        <TouchableOpacity hitSlop={hitSlop} onPressIn={() => this.setState({ isOpen: !isOpen })}>
          {this.renderIcon()}
        </TouchableOpacity>
        {isOpen ? (
          <View style={styleHint}>
            <View style={styleTriangle} />
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
            {isShowLike && this.renderLike()}
            {isShowDislike && this.renderDislike()}
          </View>
        ) : null}
      </View>
    );
  }
}
