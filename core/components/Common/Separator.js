import React from 'react';
import { View } from 'react-native';

export default function Separator() {
  return (
    <View style={{
      marginBottom: 8,
      marginHorizontal: 20,
      height: 1,
      backgroundColor: '#BCBBC1',
      zIndex: 0,
    }}
    />
  );
}
