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
    // from connect
    userId: PropTypes.string.isRequired,
    voting: PropTypes.bool.isRequired,
    addVote: PropTypes.func.isRequired,
    thingVote: PropTypes.func.isRequired,
    isVoted: PropTypes.bool,
    isLike: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    brand: null,
    price: null,
    isVoted: false,
  };

  state = {
    isOpen: false,
    isShowLike: true,
    isShowDislike: true,
  };

  handleVote = (isLike) => {
    const {
      id, lookId, userId, voting, isVoted, addVote, thingVote,
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
      <TouchableOpacity onPress={() => this.handleVote(true)} style={styles.like}>
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
      <TouchableOpacity onPress={() => this.handleVote(false)} style={styles.dislike}>
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
      name, brand, price, position: { x, y },
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
        <TouchableOpacity onPress={() => this.setState({ isOpen: !isOpen })}>
          {this.renderIcon()}
        </TouchableOpacity>
        {isOpen && (
          <View style={styleHint}>
            <View style={styleTriangle} />
            {name && this.renderName(name)}
            {brand && this.renderBrand(brand)}
            {price && this.renderPrice(price)}
            {isShowLike && this.renderLike()}
            {isShowDislike && this.renderDislike()}
          </View>
        )}
      </View>
    );
  }
}
