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

  static onExit(props) {
    const availableScreens = ['photo', 'describeItem', 'preferences', 'shopList', 'publishLook'];

    if (!availableScreens.some(item => item === Actions.currentScene)) {
      const { prevScene, currentScene } = Actions;

      Actions.refs.photo
      && Actions.refs.photo.getWrappedInstance().handleOnExit(prevScene, currentScene);
    }
  }

  handleOnExit = (prevScene, currentScene) => {
    const { image } = this.props;

    if (image) {
      Alert.alert(
        'Если вы уйдете все данные будут потеряны',
        '',
        [
          {
            text: 'Уйти',
            onPress: () => this.handleResetScene(currentScene),
            style: 'cancel',
          },
          { text: 'Остаться', onPress: () => Actions[prevScene]() },
        ],
        { cancelable: false },
      );
    }
  };

  handleResetScene = (currentScene) => {
    const { resetPublishStack } = this.props;

    resetPublishStack();
    Actions.replace('camera');
    Actions[currentScene]();
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
