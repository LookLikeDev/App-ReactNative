import React from 'react';
import PropTypes from 'prop-types';
// import { CacheManager, Image as CacheImage } from 'react-native-expo-image-cache';
import {
  View, Text, Image, StyleSheet, Dimensions,
} from 'react-native';
import UserThing from '../../../containers/looks/cards/UserThing';

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
});

export default class CardUser extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
      shop: PropTypes.shape({
        name: PropTypes.string,
      }),
      discount: PropTypes.shape({
        days: PropTypes.number.isRequired,
        target_likes: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      }),
      items: PropTypes.arrayOf(PropTypes.object),
      picture_uri: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      data: {
        user, shop, discount, items, picture_uri: uri,
      },
    } = this.props;

    const userName = user.name ? `${user.name} / ` : '';
    const shopName = shop.name ? `${shop.name}  / ` : '';
    const shopAddress = shop.address ? `${shop.address}` : '';

    const title = `${userName}${shopName}${shopAddress}`;

    return (
      <View style={styles.container}>
        {title ? (
          <Text style={styles.text}>
            {title.toUpperCase()}
          </Text>
        ) : null}
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri, cache: 'force-cache' }} />
          {items && items.length && items.map(item => (
            <UserThing
              key={item.id}
              discount={discount}
              {...item}
            />
          ))}
        </View>
      </View>
    );
  }
}
