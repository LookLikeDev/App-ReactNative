import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  ScrollView,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import Button from '../Common/Button';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

const options = {
  title: 'Выберите LOOK',
  mediaType: 'photo',
  storageOptions: {
    cameraRoll: true,
  },
  // TODO есть плавающая ошибка
  // при выборе 0.5 и сохранении некоторых фотографий в base64 в firebase изображение не открывается
  quality: 0.6,
};

export default class LookCamera extends React.Component {
  static propTypes = {
    image: PropTypes.shape({
      uri: PropTypes.string,
      data: PropTypes.string,
      origURL: PropTypes.string,
      fileName: PropTypes.string,
    }).isRequired,
    addImage: PropTypes.func.isRequired,
  };

  showPicker = () => {
    const { image, addImage } = this.props;

    if (image === null) {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          addImage(response);
        }
      });
    } else {
      Actions.publishLook();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <ScrollView contentContainerStyle={{ alignSelf: 'stretch' }}>
          <View style={{ marginBottom: 20 }}>
            {image
            && <Image source={{ uri: image.uri }} style={{ marginBottom: 16, width: imageWidth, height: imageHeight }} />}
            <Button title={!image ? 'Создать LOOK' : 'Опубликовать LOOK'} onPress={this.showPicker} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
