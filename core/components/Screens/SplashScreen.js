import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import { moduleName, signIn } from '../../../ducks/auth';

// TODO don't forget to delete this component
class SplashScreen extends React.Component {
  static propTypes = {
    // from connect
    signIn: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    token: PropTypes.string,
  };

  static defaultProps = {
    token: 'something want wrong',
  };

  componentDidMount() {
    const { signIn } = this.props;

    signIn();
  }

  render() {
    const { loading, token } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {loading ? 'Loading' : 'Splash Screen'}
        </Text>
        <Text>
          User Token:
          {' '}
          { token }
        </Text>
      </View>
    );
  }
}

export default connect(state => ({
  loading: state[moduleName].loading,
  token: state[moduleName].token,
}), {
  signIn,
})(SplashScreen);
