import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from '../../containers/Header';

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
      </View>
    );
  }
}
