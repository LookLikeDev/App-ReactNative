import React from 'react';
import { ScrollView } from 'react-native';
import DiscountItem from './DiscountItem';

export default class DiscountsList extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }}>
        <DiscountItem />
      </ScrollView>
    );
  }
}
