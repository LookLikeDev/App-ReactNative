import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { Actions } from 'react-native-router-flux';
import { TouchableWithoutFeedback, View } from 'react-native';
import iconClose from '../../../assets/icons/navbar/close.svg';

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

export default class CloseButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={Actions.pop}>
        <View>
          <SvgUri
            width="22"
            height="22"
            fill="#A1A1A1"
            source={iconClose}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
