import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { Actions } from 'react-native-router-flux';
import {
  View, CameraRoll, TouchableOpacity, Image, Text, StyleSheet,
} from 'react-native';
import { Camera, ImagePicker, Permissions } from 'expo';
import cameraButtonSvg from '../../assets/icons/camera/cameraButton.svg';
import switchCameraTypeSvg from '../../assets/icons/camera/switchCameraType.svg';

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

const styles = StyleSheet.create({
  cameraPanel: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'stretch',
  },
  bottomPanel: {
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  galleryImage: {
    width: 47,
    height: 47,
    borderRadius: 3,
  },
  title: {
    fontFamily: 'SF-Pro-Display-Black',
    fontSize: 32,
    lineHeight: 40,
    paddingHorizontal: 20,
  },
});

export default class CameraScreen extends React.Component {
  cameraRef = null;

  static propTypes = {
    // from connect
    resetPublishStack: PropTypes.func.isRequired,
    addImage: PropTypes.func.isRequired,
  };

  state = {
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
    // TODO сделать проверку есть ли вообще хоть одно изображение в галерее
    firstImageFromGallery: null,
  };

  async componentDidMount() {
    const results = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);

    const cameraRoll = await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    });

    this.setState({
      hasCameraPermission: results.every(({ status }) => status === 'granted'),
      firstImageFromGallery: cameraRoll.edges.length > 0 ? cameraRoll.edges[0].node.image : null,
    });
  }

  takePictureAsync = async () => {
    if (this.cameraRef) {
      const photo = await this.cameraRef.takePictureAsync({
        quality: 0.2,
      });

      this.savePictureAndRedirect(photo.uri);
    }
  };

  takePictureAsyncFromGallery = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.2,
      aspect: [3, 4],
    });

    if (!photo.cancelled) {
      this.savePictureAndRedirect(photo.uri);
    }
  };

  savePictureAndRedirect = (image) => {
    const { addImage } = this.props;

    addImage(image);
    Actions.photo();
  };

  handleCameraSwitchType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType: cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  };

  render() {
    const {
      hasCameraPermission, firstImageFromGallery: galleryImage, cameraType,
    } = this.state;

    if (hasCameraPermission === null) {
      console.log('WTF');
      return <View />;
    } if (hasCameraPermission === false) {
      return (
        <Text>
          Нет доступа к камере
        </Text>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={cameraType} ref={(ref) => { this.cameraRef = ref; }}>
          <View style={styles.cameraPanel}>
            <View style={styles.bottomPanel}>
              <TouchableOpacity hitSlop={hitSlop} onPress={this.takePictureAsyncFromGallery}>
                {galleryImage
                  ? (<Image style={styles.galleryImage} source={{ uri: galleryImage.uri }} />)
                  : (<View style={styles.galleryImage} />)}
              </TouchableOpacity>
              <TouchableOpacity hitSlop={hitSlop} onPress={this.takePictureAsync}>
                <SvgUri
                  width="65"
                  height="65"
                  source={cameraButtonSvg}
                />
              </TouchableOpacity>
              <TouchableOpacity hitSlop={hitSlop} onPress={this.handleCameraSwitchType}>
                <SvgUri
                  width="36"
                  height="27"
                  source={switchCameraTypeSvg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}
