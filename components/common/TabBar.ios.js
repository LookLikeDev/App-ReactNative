import React from 'react';
import {
  TabBarIOS, View, Text, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    margin: 50,
    fontSize: 40,
  },
});

export default class TabBar extends React.Component {
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          systemIcon="contacts"
          selected={false}
        >
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>
              Home
            </Text>
          </View>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="favorites"
          selected={false}
        >
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>
              Favorites
            </Text>
          </View>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="camera"
          selected={false}
        >
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>
              Photo
            </Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
