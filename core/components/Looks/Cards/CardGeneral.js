import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
// import { CacheManager, Image as CacheImage } from 'react-native-expo-image-cache';
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import like from '../../../../assets/icons/look/like.svg';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 28,
    zIndex: 2,
  },
  text: {
    fontFamily: 'SF-UI-Text-Semibold',
    color: '#000000',
    fontSize: 11,
    lineHeight: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  imageWrap: {
    position: 'relative',
    width: imageWidth,
    height: imageHeight,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: Image.resizeMode.cover,
  },
  like: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#00C835',
    borderRadius: 20,
    transform: [{ rotate: '15deg' }],
    position: 'absolute',
    right: 20,
    bottom: -31,
    zIndex: 2,
  },
  dislike: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: '#FC4600',
    borderRadius: 20,
    transform: [{ rotate: '-15deg' }],
    position: 'absolute',
    left: 20,
    bottom: -31,
    zIndex: 2,
  },
  likeSvg: {
    transform: [{ rotate: '-15deg' }],
  },
  dislikeSvg: {
    transform: [{ rotate: '195deg' }],
  },
});

export default class CardGeneral extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
      shop: PropTypes.shape({
        name: PropTypes.string,
      }),
      items: PropTypes.arrayOf(PropTypes.object),
      picture_uri: PropTypes.string.isRequired,
    }).isRequired,
    onPressLike: PropTypes.func,
    onPressDislike: PropTypes.func,
  };

  static defaultProps = {
    onPressLike: false,
    onPressDislike: false,
  };

  componentWillUnmount() { // trigger on like's click (we will remove the item)
    LayoutAnimation.easeInEaseOut();
  }

  handleLike = () => {
    const { onPressLike, data } = this.props;

    onPressLike(data);
  };

  handleDislike = () => {
    const { onPressDislike, data } = this.props;

    onPressDislike(data);
  };

  render() {
    const { data: { user, shop, picture_uri: uri } } = this.props;

    const userName = user.name ? `${user.name} / ` : '';
    const shopName = shop.name ? `${shop.name}  / ` : '';
    const shopAddress = shop.address ? `${shop.address}` : '';

    const title = `${userName}${shopName}${shopAddress}`;

    return (
      <View style={styles.container}>
        {title && (
          <Text style={styles.text}>
            {title.toUpperCase()}
          </Text>
        )}
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri, cache: 'force-cache' }} />
        </View>
        <TouchableOpacity style={styles.dislike} onPress={this.handleDislike}>
          <View style={styles.dislikeSvg}>
            <SvgUri
              width="32"
              height="32"
              fill="#FFFFFF"
              source={like}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.like} onPress={this.handleLike}>
          <View style={styles.likeSvg}>
            <SvgUri
              width="32"
              height="32"
              fill="#FFFFFF"
              source={like}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
