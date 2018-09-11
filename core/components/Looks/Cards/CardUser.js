import React from 'react';
import PropTypes from 'prop-types';
// import { CacheManager, Image as CacheImage } from 'react-native-expo-image-cache';
import {
  View, Text, Image, StyleSheet, Dimensions,
} from 'react-native';
import UserThing from '../../../containers/looks/cards/UserThing';
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
        user, shop, discount, items, picture_uri: uri, date_published: datePublished,
      },
    } = this.props;

    const age = getCalculatedAge(user.birthday, datePublished);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {user.name ? user.name.toUpperCase() : null}
          {age ? `, ${age}`.toUpperCase() : null}
          {shop.name ? ` / ${shop.name}`.toUpperCase() : null}
          {shop.address ? ` / ${shop.address}`.toUpperCase() : null}
        </Text>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri, cache: 'force-cache' }} />

          {items && items.length && items.map(item => { console.log(item); return (
            <UserThing
              key={item.id}
              discount={discount}
              {...item}
            />
          )})}
        </View>
      </View>
    );
  }
}
