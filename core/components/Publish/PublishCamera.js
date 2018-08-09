import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import {
  Dimensions,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Button from '../Common/Button';
import PublishThings from './PublishThings';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

const options = {
  title: 'Выберите LOOK',
  mediaType: 'photo',
  maxWidth: 1080,
  noData: true, // {true} disable base64 encoded image data
  storageOptions: {
    cameraRoll: true,
  },
  quality: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000FF',
    position: 'relative',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  touch: {
    position: 'relative',
  },
});

export default class PublishCamera extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    things: PropTypes.arrayOf(PropTypes.object).isRequired,
    addThing: PropTypes.func.isRequired,
    addImage: PropTypes.func.isRequired,
    removeThing: PropTypes.func.isRequired,
  };

  static defaultProps = {
    image: null,
  };

  showPicker = () => {
    const { image, addImage } = this.props;

    if (image === null) {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else {
          addImage(response.uri);
        }
      });
    } else {
      Actions.publishLook();
    }
  };

  handleTap = (event) => {
    const { addThing } = this.props;
    const { locationX, locationY } = event.nativeEvent;
    const thingId = uuid();

    // The values must be saved in percentages. To correctly display on different devices.
    const x = Math.round(locationX / (wrapWidth / 100));
    const y = Math.round(locationY / (wrapHeight / 100));

    addThing({
      id: thingId,
      position: {
        x, y,
      },
    });

    Actions.describeItem({ hideBackButton: true, thingId });
  };

  render() {
    const { image, things, removeThing } = this.props;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <ScrollView contentContainerStyle={{ alignSelf: 'stretch' }}>
          <View style={{ marginBottom: 20 }}>
            {image
            && (
            <TouchableOpacity style={styles.touch} onPress={this.handleTap}>
              <Image
                source={{ uri: image }}
                style={{ marginBottom: 16, width: wrapWidth, height: wrapHeight }}
              />
              <PublishThings items={things} removeThing={removeThing} />
            </TouchableOpacity>
            )
            }
          </View>
          <Button title={!image ? 'Создать LOOK' : 'Опубликовать LOOK'} onPress={this.showPicker} />
        </ScrollView>
      </View>
    );
  }
}
