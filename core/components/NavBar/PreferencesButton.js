import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { Actions } from 'react-native-router-flux';
import { TouchableWithoutFeedback, View } from 'react-native';
import iconPreferences from '../../../assets/icons/navbar/preferences.svg';

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

export default class RightButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback hitSlop={hitSlop} onPress={Actions.preferences}>
        <View>
          <SvgUri
            width="22"
            height="22"
            fill="#A1A1A1"
            source={iconPreferences}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
