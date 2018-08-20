import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import Header from '../containers/Header';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

export default class DiscountsDetailScreen extends React.Component {
  static propTypes = {
    // from react-native-router-flux and <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <View style={{ flex: 1 }}>
          <View style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '0deg' }] }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Barcode-128', fontSize: 80 }}>
              HelloWorldHello
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
