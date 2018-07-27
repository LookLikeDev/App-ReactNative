import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../containers/Header';
import LooksList from '../containers/LooksList';
import Button from '../components/Common/Button';

export default class MainScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <LooksList />
      </View>
    );
  }
}
