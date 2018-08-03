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
import LookLabels from './LookLabels';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

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

export default class LookCamera extends React.Component {
  static propTypes = {
    image: PropTypes.shape({
      uri: PropTypes.string,
      data: PropTypes.string,
      origURL: PropTypes.string,
      fileName: PropTypes.string,
    }).isRequired,
    things: PropTypes.arrayOf(PropTypes.object).isRequired,
    addThing: PropTypes.func.isRequired,
    addImage: PropTypes.func.isRequired,
    removeThing: PropTypes.func.isRequired,
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

    addThing({
      id: thingId,
      position: {
        x: locationX,
        y: locationY,
      },
    });

    Actions.markItems({ hideBackButton: true, thingId });
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
                style={{ marginBottom: 16, width: imageWidth, height: imageHeight }}
              />
              <LookLabels items={things} areaWidth={imageWidth} removeThing={removeThing} />
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
