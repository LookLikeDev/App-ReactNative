import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../containers/Header';
import LooksListUser from '../containers/looks/LooksListUser';

export default class MainScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    // from connect
    initialed: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    updateList: PropTypes.func.isRequired,
  };

  static onEnter() {
    console.log('ENTER');
    Actions.refs.looks.getWrappedInstance().handleOnEnter();
  }

  handleOnEnter = () => {
    const { initialed, updateList, userId } = this.props;

    console.log('HANDLE');

    if (initialed) updateList(userId);
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <LooksListUser />
      </View>
    );
  }
}
