import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { Actions } from 'react-native-router-flux';
import { Constants } from 'expo';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import iconBack from '../../assets/icons/navbar/back.svg';
import iconClose from '../../assets/icons/navbar/close.svg';
import iconPreferences from '../../assets/icons/navbar/preferences.svg';

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

const styles = StyleSheet.create({
  container: {
    height: Constants.statusBarHeight + 44,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF0F0F',
  },
  solo: {
    justifyContent: 'flex-end',
  },
});

export default class NavBar extends React.Component {
  static propTypes = {
    // from react-native-router-flux
    scene: PropTypes.shape({
      index: PropTypes.number.isRequired,
    }).isRequired,
    hideBackButton: PropTypes.bool,
  };

  static defaultProps = {
    hideBackButton: false,
  };

  renderLeft = () => {
    const { hideBackButton } = this.props;
    const isPreferences = Actions.currentScene === 'preferences';
    const isHideLeftButton = isPreferences || hideBackButton;

    if (isHideLeftButton) return <View style={{ width: 14, height: 22 }} />;

    return (
      <TouchableOpacity hitSlop={hitSlop} onPress={Actions.pop}>
        <SvgUri
          width="14"
          height="22"
          fill="#A1A1A1"
          source={iconBack}
        />
      </TouchableOpacity>
    );
  };

  renderRight = () => (
    <TouchableOpacity hitSlop={hitSlop} onPress={Actions.preferences}>
      <SvgUri
        width="22"
        height="22"
        fill="#A1A1A1"
        source={iconPreferences}
      />
    </TouchableOpacity>
  );

  renderClose = () => (
    <TouchableOpacity hitSlop={hitSlop} onPress={Actions.pop}>
      <SvgUri
        width="22"
        height="22"
        fill="#A1A1A1"
        source={iconClose}
      />
    </TouchableOpacity>
  );

  render() {
    const { hideBackButton } = this.props;
    const isPreferences = Actions.currentScene === 'preferences';
    const isHideLeftButton = isPreferences || hideBackButton;

    return (
      <View style={[styles.container]}>
        { this.renderLeft() }
        { isPreferences ? this.renderClose() : this.renderRight() }
      </View>
    );
  }
}
