import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from '../containers/Header';

export default class DescribeItemScreen extends React.Component {
  static propTypes = {
    // from <Scene />
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
