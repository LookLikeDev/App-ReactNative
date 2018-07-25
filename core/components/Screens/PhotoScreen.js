import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {
  Dimensions, Image, ScrollView, View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Header from '../Header';
import Button from '../Button';
import { addNewImage, moduleName } from "../../../ducks/looks";

const options = {
  title: 'Выберите LOOK',
  mediaType: 'photo',
};

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 4) / 3);
const imageWidth = dimensions.width;

class PhotoScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  state = {
    image: null,
  };

  showPicker = () => {
    const { image } = this.props;

    if (image === null) {
      ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          /*console.log('-- Success ---', response);
          const source = { uri: `data:image/jpeg;base64,${response.data}` };
          const storageRef = firebase.storage().ref();
          const mountainImagesRef = storageRef.child('images/mountains2.jpg');

          const uploadTask = mountainImagesRef.putString(response.data, 'base64', { contentType: 'image/jpeg' });/!*.then((snapshot) => {
            console.log('Uploaded a base64 string!');
            console.log(snapshot);
          });*!/

          uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, (error) => {
            console.log('Error', error);
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
            });
          });*/

          this.props.addNewImage(response);
          // this.setState({ image: response });
        }
      });
    } else {
      console.log('Yep Yep Yep');
    }
  };

  render() {
    // const { image } = this.state;
    const { title, image } = this.props;

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

const mapStateToProps = state => ({
  image: state[moduleName].image,
});

const mapDispatchToProps = {
  addNewImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen);
