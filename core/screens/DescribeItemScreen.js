import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PublishThingForm from '../containers/publish/PublishThingForm';
import Header from '../containers/Header';

export default class MarkItemsScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    thingId: PropTypes.string.isRequired,
    edit: PropTypes.bool,
  };

  static defaultProps = {
    edit: false,
  };

  static onExit() {
    const availableScreens = ['photo', 'describeItem', 'preferences', 'shopList', 'publishLook'];

    if (!availableScreens.some(item => item === Actions.currentScene)) {
      Actions.refs.photo.getWrappedInstance().handleOnExit(Actions.prevScene);
    }
  }

  render() {
    const { title, thingId, edit } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <PublishThingForm thingId={thingId} edit={edit} />
      </View>
    );
  }
}
