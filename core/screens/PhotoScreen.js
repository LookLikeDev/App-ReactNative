import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from '../components/Header';
import LookCamera from '../containers/Looks/LookCamera';

export default class PhotoScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    // TODO refactor styles
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <LookCamera />
      </View>
    );
  }
}
