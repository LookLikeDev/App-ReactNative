import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image, Dimensions,
} from 'react-native';
import FavoriteThing from '../../../containers/looks/cards/FavoriteThing';
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

export default class CardFavorite extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture_uri: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
      shop: PropTypes.shape({
        name: PropTypes.string,
      }),
      discount: PropTypes.shape({
        target_likes: PropTypes.number,
      }),
      items: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  };

  render() {
    const {
      data: {
        id, user, shop, items, picture_uri: uri, date_published: datePublished,
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
          <Image style={styles.image} source={uri && { uri }} />
          {items && items.length && items.map(item => <FavoriteThing key={item.id} lookId={id} item={item} />)}
        </View>
      </View>
    );
  }
}
