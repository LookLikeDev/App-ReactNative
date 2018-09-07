import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
// import { CacheManager, Image as CacheImage } from 'react-native-expo-image-cache';
import {
  View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, LayoutAnimation,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import like from '../../../../assets/icons/look/like.svg';
import alertSvg from '../../../../assets/icons/look/alert.svg';
import { getCalculatedAge } from '../../../utils';

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
  alertContainer: {
    flex: 1,
    height: 36,
    width: 36,
    position: 'absolute',
    right: 20,
    top: 42,
    zIndex: 2,
  },
  alertButton: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeContainer: {
    flex: 1,
    height: 80,
    width: 80,
    position: 'absolute',
    right: 20,
    bottom: 8, // -31
    zIndex: 2,
    backgroundColor: '#00C835',
    borderRadius: 20,
    transform: [{ rotate: '15deg' }],
  },
  like: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dislikeContainer: {
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
    bottom: 8, // -31
    zIndex: 2,
  },
  dislike: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
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
    onPressBlockLook: PropTypes.func,
    onPressBlockUser: PropTypes.func,
  };

  static defaultProps = {
    onPressLike: false,
    onPressDislike: false,
    onPressBlockLook: false,
    onPressBlockUser: false,
  };

  handleLike = () => {
    const { onPressLike, data } = this.props;

    onPressLike(data);
  };

  handleDislike = () => {
    const { onPressDislike, data } = this.props;

    onPressDislike(data);
  };

  handleAlertMenu = () => {
    this.ActionSheet.show();
  };

  componentWillUnmount() { // trigger on like's click (we will remove the item)
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const {
      data: {
        user, shop, picture_uri: uri, date_published: datePublished,
      },
    } = this.props;
    const age = getCalculatedAge(user.birthday, datePublished);
    const { onPressBlockLook, onPressBlockUser, data } = this.props;
    return (
      <View style={styles.container}>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title="Выберите действие"
          options={['Нежелательный контент', 'Заблокировать автора', 'Отмена']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={(index) => {
            if (index === 0) {
              onPressBlockLook(data);
            }
            if (index === 1) {
              onPressBlockUser(data);
            }
          }}
        />
        <Text style={styles.text}>
          {user.name ? user.name.toUpperCase() : null}
          {age ? `, ${age}`.toUpperCase() : null}
          {shop.name ? ` / ${shop.name}`.toUpperCase() : null}
          {shop.address ? ` / ${shop.address}`.toUpperCase() : null}
        </Text>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri, cache: 'force-cache' }} />
        </View>
        <View style={styles.alertContainer}>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={this.handleAlertMenu}
          >
            <View>
              <SvgUri
                width="32"
                height="32"
                source={alertSvg}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.dislikeContainer}>
          <TouchableOpacity
            style={styles.dislike}
            onPress={this.handleDislike}
          >
            <View style={styles.dislikeSvg}>
              <SvgUri
                width="32"
                height="32"
                fill="#FFFFFF"
                source={like}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.likeContainer}>
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
      </View>
    );
  }
}
