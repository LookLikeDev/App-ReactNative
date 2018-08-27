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
import { Actions } from 'react-native-router-flux';
import Button from '../Common/Button';
import PublishThings from './PublishThings';

const dimensions = Dimensions.get('window');
const wrapHeight = Math.round((dimensions.width * 4) / 3);
const wrapWidth = dimensions.width;

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
    removeThing: PropTypes.func.isRequired,
    updateThing: PropTypes.func.isRequired,
  };

  static defaultProps = {
    image: null,
  };

  state = {
    scrollEnabled: true,
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

  handleDragBegin = () => this.setState({ scrollEnabled: false });

  handleDragEnd = () => this.setState({ scrollEnabled: true });

  render() {
    const { image, things, removeThing, updateThing } = this.props;
    const { scrollEnabled } = this.state;

    return (
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        <ScrollView
          style={{ marginBottom: 20 }}
          contentContainerStyle={{ alignSelf: 'stretch' }}
          scrollEnabled={scrollEnabled}
        >
          {image
          && (
            <React.Fragment>
              <View>
                <TouchableOpacity style={styles.touch} onPress={this.handleTap}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: wrapWidth, height: wrapHeight, position: 'relative', zIndex: 1 }}
                  />
                  <PublishThings
                    items={things}
                    removeThing={removeThing}
                    updateThing={updateThing}
                    onDragBegin={this.handleDragBegin}
                    onDragEnd={this.handleDragEnd}
                  />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </ScrollView>
        {things.length === 0 && (
          <View style={styles.textWrap}>
            <Text style={styles.welcome}>
              Нажмите на вещи и опишите их
            </Text>
            <Text style={styles.instructions}>
              Для публикации лука и получения скидки,
              отметьте одну или несколько вещей для голосования.
            </Text>
          </View>
        )}
        <View style={styles.buttonWrap}>
          {image && things.length > 0 && <Button title="Опубликовать LOOK" onPress={this.handleSubmit} />}
        </View>
      </View>
    );
  }
}
