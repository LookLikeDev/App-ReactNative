import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import Header from '../containers/Header';
import LooksListGeneral from '../containers/looks/LooksListGeneral';

export default class MainScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    // from connect
    initialed: PropTypes.bool.isRequired,
    likedLooks: PropTypes.objectOf(PropTypes.object),
    dislikedLooks: PropTypes.objectOf(PropTypes.object),
    updateList: PropTypes.func.isRequired,
  };

  static onEnter() {
    Actions.refs.main.getWrappedInstance().handleOnEnter();
  }

  handleOnEnter = () => {
    const {
      initialed, updateList, likedLooks, dislikedLooks,
    } = this.props;

    if (initialed) updateList({ ...likedLooks, ...dislikedLooks });
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <LooksListGeneral />
      </View>
    );
  }
}
