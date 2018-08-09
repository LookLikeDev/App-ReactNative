import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import {
  Dimensions,
  View,
  Text,
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
  textWrap: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  welcome: {
    fontFamily: 'SF-Pro-Display-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    margin: 8,
    textAlign: 'center',
    color: '#000000',
  },
  instructions: {
    fontFamily: 'SF-UI-Text-Regular',
    color: '#A1A1A1',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  touch: {
    position: 'relative',
  },
  buttonWrap: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 20,
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
    const { addImage } = this.props;

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        addImage(response.uri);
      }
    });
  };

  handleSubmit = () => {
    Actions.publishLook();
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
          {image
          && (
            <React.Fragment>
              <View style={{ marginBottom: 20 }}>
                <TouchableOpacity style={styles.touch} onPress={this.handleTap}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: wrapWidth, height: wrapHeight }}
                  />
                  <PublishThings items={things} removeThing={removeThing} />
                </TouchableOpacity>
              </View>
              {things.length === 0 && (
                <View style={styles.textWrap}>
                  <Text style={styles.welcome}>
                    Отметь свой LOOK и получи скидку
                  </Text>
                  <Text style={styles.instructions}>
                    Для публикации лука и получения скидки,
                    отметьте одну или несколько вещей для голосования».
                  </Text>
                </View>
              )}
            </React.Fragment>
          )}
          <View style={styles.buttonWrap}>
            {image && things.length > 0 && <Button title="Опубликовать LOOK" onPress={this.handleSubmit} />}
            {!image && <Button title="Создать LOOK" onPress={this.showPicker} />}
          </View>
        </ScrollView>
      </View>
    );
  }
}
