import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import PublishThingForm from '../containers/Publish/PublishThingForm';
import Header from '../containers/Header';

export default class MarkItemsScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    thingId: PropTypes.string.isRequired,
  };

  render() {
    const { title, thingId } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <PublishThingForm thingId={thingId} />
      </View>
    );
  }
}
