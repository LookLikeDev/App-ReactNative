import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutAnimation,
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
  hide: {
    opacity: 0,
    height: 0,
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

export default class LooksList extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    hide: false,
  };

  componentWillUpdate() {
    const config = {
      duration: 300,
      update: {
        type: 'linear',
      },
    };
    LayoutAnimation.configureNext(config);
  }

  render() {
    const { image, user } = this.props;
    const containerStyle = this.state.hide ? styles.hide : styles.container;

    return (
      <React.Fragment>
        <View style={containerStyle}>
          <View style={styles.separator} />
          <Text style={styles.text}>
            {user.name.toUpperCase()}
          </Text>
          <Image style={styles.image} source={image && { uri: image }} />
          <TouchableOpacity style={styles.dislike} onPress={() => this.setState({ hide: true })}>
            <SvgUri
              style={styles.dislikeSvg}
              width="32"
              height="32"
              fill="#FFFFFF"
              source={like}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.like} onPress={() => this.setState({ hide: true })}>
            <SvgUri
              style={styles.likeSvg}
              width="32"
              height="32"
              fill="#FFFFFF"
              source={like}
            />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}
