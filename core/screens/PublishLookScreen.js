import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from '../containers/Header';
import PublishForm from '../containers/Publish/PublishForm';

export default class PublishLookScreen extends React.Component {
  static propTypes = {
    // from <Scene />
    title: PropTypes.string.isRequired,
    shop: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    shop: {
      name: null,
    },
  };

  render() {
    const { title, shop } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <Header title={title} />
        <PublishForm shop={shop} />
      </View>
    );
  }
}
