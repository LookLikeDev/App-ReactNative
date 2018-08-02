import React from 'react';
import { Text, View, TouchableOpacity, CameraRoll, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    rollImage: null,
  };

  async componentWillMount() {
    const results = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);

    const cameraRoll = await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    });

    console.log(cameraRoll);
    this.setState({
      hasCameraPermission: results.every(({ status }) => status === 'granted'),
      image: cameraRoll.edges[0].node.image,
    });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } if (hasCameraPermission === false) {
      return (
        <Text>
          No access to camera
        </Text>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={this.state.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
              }}
            >
              <Text
                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
              >
                {' '}
                Flip
                {' '}
              </Text>
            </TouchableOpacity>
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                source={{ uri: this.state.image.uri }}
              />
              <Text>Test</Text>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}
