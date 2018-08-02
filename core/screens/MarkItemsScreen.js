import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import LookMarkItemsForm from '../containers/Looks/LookMarkItemsForm';
import Header from '../containers/Header';

export default class MarkItemsScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    console.log(this.props);

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <LookMarkItemsForm />
      </View>
    );
  }
}
