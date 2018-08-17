import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { moduleName as userModuleName, signIn } from '../../ducks/user';
import { moduleName as discountsModuleName, fetchList } from '../../ducks/discounts';

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
  },
  title: {
    fontFamily: 'SF-UI-Text-Semibold',
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#A1A1A1',
    textAlign: 'center',
  },
});

// TODO don't forget to delete this component
class SplashScreen extends React.Component {
  static propTypes = {
    // from connect
    userId: PropTypes.string,
    isNetworkError: PropTypes.bool.isRequired,
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
    const { userId, isNetworkError, auth } = this.props;

    if (isNetworkError) {
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignContent: 'center' }}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Не удалось установить соединение.
            </Text>
            <Text style={styles.description}>
              Проверьте доступ в интернет или попробуйте повторить вход позже.
            </Text>
            <Button onPress={auth} title="Повторить подключение" />
          </View>
        </View>
      );
    }

    return null;
  }
}

export default connect(state => ({
  loadingDiscounts: state[discountsModuleName].loading,
  loadedDiscounts: state[discountsModuleName].loaded,
  userId: state[userModuleName].id,
  isNetworkError: state[userModuleName].isNetworkError,
}), {
  auth: signIn,
  fetchDiscountsList: fetchList,
})(SplashScreen);
