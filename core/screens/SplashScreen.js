import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { moduleName as userModuleName, signIn } from '../../ducks/user';
import { moduleName as discountsModuleName, fetchList } from '../../ducks/discounts';
import Button from '../components/Common/Button';

// TODO don't forget to delete this component
class SplashScreen extends React.Component {
  static propTypes = {
    // from connect
    userId: PropTypes.string,
    loadingDiscounts: PropTypes.bool.isRequired,
    loadedDiscounts: PropTypes.bool.isRequired,
    auth: PropTypes.func.isRequired,
    fetchDiscountsList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    userId: '',
  };

  componentDidMount() {
    const { auth } = this.props;

    auth();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) Actions.push('main');
  }

  getSnapshotBeforeUpdate() {
    const {
      loadingDiscounts, loadedDiscounts, fetchDiscountsList, userId,
    } = this.props;

    if (userId && !loadedDiscounts && !loadingDiscounts) fetchDiscountsList(userId);

    if (userId && loadedDiscounts) return true;

    return null;
  }

  render() {
    const { userId } = this.props;

    return null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          User Token:
          {' '}
          { userId }
        </Text>
        <Button title="На главную" onPress={() => Actions.push('main')} />
      </View>
    );
  }
}

export default connect(state => ({
  loadingDiscounts: state[discountsModuleName].loading,
  loadedDiscounts: state[discountsModuleName].loaded,
  userId: state[userModuleName].id,
}), {
  auth: signIn,
  fetchDiscountsList: fetchList,
})(SplashScreen);
