import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import Header from '../containers/Header';
import policy from '../../assets/policy.pdf';

export default class PreferencesScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title="Политика" />
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <WebView
            style={{ flex: 1 }}
            source={policy}
          />
        </View>
      </View>
    );
  }
}
