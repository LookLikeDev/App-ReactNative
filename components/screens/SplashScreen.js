import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import { moduleName, signIn } from '../../ducks/auth';


class SplashScreen extends React.Component {
  static propTypes = {
    // from connect
    signIn: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { signIn } = this.props;

    signIn();
  }

  render() {
    const { loading } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {loading ? 'Loading' : 'Splash Screen'}
        </Text>
      </View>
    );
  }
}

export default connect(state => ({
  user: state[moduleName].user,
  loading: state[moduleName].loading,
}), {
  signIn,
})(SplashScreen);
