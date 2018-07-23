import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image, Dimensions,
} from 'react-native';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: Image.resizeMode.cover,
  },
  text: {
    color: '#000000',
    fontSize: 11,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  separator: {
    marginHorizontal: 20,
    marginBottom: 8,
    height: 1,
    backgroundColor: '#BCBBC1',
  },
});

export default class LooksList extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    user: PropTypes.object,
  };

  render() {
    const { image, user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        <Text style={styles.text}>
          {user.name.toUpperCase()}
        </Text>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
    );
  }
}
