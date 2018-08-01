import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import like from '../../../assets/icons/look/like.svg';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 8,
    marginBottom: 28,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: Image.resizeMode.cover,
  },
  text: {
    fontFamily: 'SF-UI-Text-Semibold',
    color: '#000000',
    fontSize: 11,
    lineHeight: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  separator: {
    position: 'absolute',
    marginHorizontal: 20,
    height: 1,
    backgroundColor: '#BCBBC1',
    zIndex: 1,
    bottom: -28,
    left: 0,
    right: 0,
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

export default class LooksItem extends React.Component {
  static propTypes = {
    // From connect
    userId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      reference: PropTypes.objectOf(PropTypes.object).isRequired,
    }).isRequired,
    onPressLike: PropTypes.func,
    onPressDislike: PropTypes.func,
  };

  static defaultProps = {
    onPressLike: false,
    onPressDislike: false,
  };

  handleLike = () => {
    const { onPressLike, data } = this.props;

    onPressLike(data);
  };

  handleDislike = () => {
    const { onPressDislike, data } = this.props;

    onPressDislike(data);
  };

  render() {
    const {
      data: { image, user }, onPressLike, onPressDislike,
    } = this.props;

    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.separator} />
          <Text style={styles.text}>
            {user.name.toUpperCase()}
          </Text>
          <Image style={styles.image} source={image && { uri: image }} />
          {onPressLike
          && (
          <TouchableOpacity style={styles.dislike} onPress={this.handleDislike}>
            <SvgUri
              style={styles.dislikeSvg}
              width="32"
              height="32"
              fill="#FFFFFF"
              source={like}
            />
          </TouchableOpacity>
          )}
          {onPressDislike
          && (
          <TouchableOpacity style={styles.like} onPress={this.handleLike}>
            <SvgUri
              style={styles.likeSvg}
              width="32"
              height="32"
              fill="#FFFFFF"
              source={like}
            />
          </TouchableOpacity>
          )}
        </View>
      </React.Fragment>
    );
  }
}
