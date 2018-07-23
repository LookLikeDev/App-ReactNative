import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from '../../utils';

const styles = StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight(true),
    marginBottom: 8,
  },
  title: {
    fontFamily: 'System',
    fontSize: 34,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});

export default class Header extends React.Component {
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
