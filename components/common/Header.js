import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from '../../utils/statusBar';

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight(true),
  },
  title: {
    fontFamily: 'System',
    fontSize: 34,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;

    return (
      <View style={styles.header}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
      </View>
    );
  }
}

export default connect(state => ({ router: state.router }))(Header);
