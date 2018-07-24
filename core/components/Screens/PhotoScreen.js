import React from 'react';
import {
  Button, Image, View, Alert,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class PhotoScreen extends React.Component {
  state = {
    image: null,
  };

  pickImage = async () => {
    const results = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL),
    ]);

    if (results.some(({ status }) => { console.log(status); return status !== 'granted'; })) {
      Alert.alert('No access to CAMERA');
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
        {image
        && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}
