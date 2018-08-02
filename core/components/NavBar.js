import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { Actions } from 'react-native-router-flux';
import { Constants } from 'expo';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import iconBack from '../../assets/icons/navbar/back.svg';
import iconClose from '../../assets/icons/navbar/close.svg';
import iconPreferences from '../../assets/icons/navbar/preferences.svg';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 12,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  solo: {
    justifyContent: 'flex-end',
  },
});

export default class NavBar extends React.Component {
  static propTypes = {
    // from react-native-router-flux
    title: PropTypes.string.isRequired,
    scene: PropTypes.shape({
      index: PropTypes.number.isRequired,
    }).isRequired,
  };

  renderLeft = () => {
    const { scene: { index } } = this.props;
    const isPreferences = Actions.currentScene === 'preferences';

    if (!index || isPreferences) return null;

    return (
      <TouchableOpacity onPress={Actions.pop}>
        <SvgUri
          width="14"
          height="22"
          fill="#A1A1A1"
          source={iconBack}
        />
      </TouchableOpacity>
    );
  };

  renderMiddle = () => (
    <View>
      <Text>
        { this.props.title }
      </Text>
    </View>
  );

  renderRight = (isPreferences) => {
    return (
      <TouchableOpacity onPress={isPreferences ? Actions.pop : Actions.preferences}>
        <SvgUri
          width="22"
          height="22"
          fill="#A1A1A1"
          source={isPreferences ? iconClose : iconPreferences}
        />
      </TouchableOpacity>
    );
  };

  render() {
    console.log(this.props);
    const { scene: { index } } = this.props;
    const isPreferences = Actions.currentScene === 'preferences';

    return (
      <View style={[styles.container, (!index || isPreferences) && styles.solo]}>
        { this.renderLeft() }
        {/* { this.renderMiddle() } */}
        { this.renderRight(isPreferences) }
      </View>
    );
  }
}
