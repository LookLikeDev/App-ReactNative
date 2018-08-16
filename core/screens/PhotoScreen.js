import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Alert, View,
} from 'react-native';
import Header from '../components/Header';
import PublishCamera from '../containers/publish/PublishCamera';

export default class PhotoScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    // from connect
    resetPublishStack: PropTypes.func.isRequired,
    image: PropTypes.string,
  };

  static defaultProps = {
    image: null,
  };

  static onExit() {
    const availableScreens = ['photo', 'describeItem', 'preferences', 'shopList', 'publishLook'];

    if (!availableScreens.some(item => item === Actions.currentScene)) {
      Actions.refs.photo.getWrappedInstance().handleOnExit(Actions.prevScene);
    }
  }

  handleOnExit = (prevScene) => {
    const { resetPublishStack, image } = this.props;

    console.log(prevScene);

    if (image) {
      Alert.alert(
        'Если вы уйдете все данные будут потеряны',
        '',
        [
          { text: 'Уйти', onPress: resetPublishStack, style: 'cancel' },
          { text: 'Остаться', onPress: () => Actions[prevScene]() },
        ],
        { cancelable: false },
      );
    }
  };

  render() {
    const { title } = this.props;

    // TODO refactor styles
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <PublishCamera />
      </View>
    );
  }
}
