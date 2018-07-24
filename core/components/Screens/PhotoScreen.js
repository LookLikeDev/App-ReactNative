import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, Image, ScrollView, View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Header from '../Header';
import Button from '../Button';

const options = {
  title: 'Выберите LOOK',
  mediaType: 'photo',
};

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

export default class PhotoScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  state = {
    image: null,
  };

  showPicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('-- Success ---', response);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ image: response });
      }
    });
  };

  render() {
    const { image } = this.state;
    const { title } = this.props;

    // TODO refactor styles
    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <ScrollView contentContainerStyle={{ alignSelf: 'stretch' }}>
            <View style={{ marginBottom: 20 }}>
              {image
              && <Image source={{ uri: image.uri }} style={{ marginBottom: 16, width: imageWidth, height: imageHeight }} />}
              <Button title={!image ? 'Создать LOOK' : 'Опубликовать LOOK'} onPress={this.showPicker} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
