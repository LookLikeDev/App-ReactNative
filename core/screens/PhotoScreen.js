import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Alert, View } from 'react-native';
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
      Actions.refs.photo.getWrappedInstance().handleOnExit();
    }
  }

  handleOnExit = () => {
    const { resetPublishStack, image } = this.props;

    if (image) {
      Alert.alert(
        'Вы хотите сохраните изменения',
        null,
        [
          { text: 'Удалить', onPress: resetPublishStack, style: 'cancel' },
          { text: 'Сохранить' },
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
