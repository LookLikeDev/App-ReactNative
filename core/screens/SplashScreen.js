import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { moduleName, signIn } from '../../ducks/user';
import Button from '../components/Common/Button';

// TODO don't forget to delete this component
class SplashScreen extends React.Component {
  static propTypes = {
    // from connect
    signIn: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    id: PropTypes.string,
  };

  static defaultProps = {
    id: 'something want wrong',
  };

  componentDidMount() {
    const { signIn } = this.props;

    signIn();
  }

  render() {
    const { loading, id } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          {loading ? 'Loading' : 'Splash Screen'}
        </Text>
        <Text>
          User Token:
          {' '}
          { id }
        </Text>
        <Button title="На главную" onPress={Actions.main} />
      </View>
    );
  }
}

export default connect(state => ({
  loading: state[moduleName].loading,
  id: state[moduleName].id,
}), {
  signIn,
})(SplashScreen);
