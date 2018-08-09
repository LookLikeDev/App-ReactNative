import React from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, TextInput, StyleSheet,
} from 'react-native';
import ShopItem from './ShopItem';

const styles = StyleSheet.create({
  inputGroup: {
    height: 56,
    paddingVertical: 6,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EBEBEB',
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#BCBBC1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flex: 1,
    fontFamily: 'SF-UI-Text-Regular',
    fontSize: 16,
    color: '#000000',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default class ShopsList extends React.Component {
  static propTypes = {
    // from connect
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      value: PropTypes.number.isRequired,
      date_issued: PropTypes.object.isRequired,
      date_expiration: PropTypes.object.isRequired,
      is_applied: PropTypes.bool.isRequired,
      shop: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      look_id: PropTypes.string.isRequired,
      item: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })).isRequired,
    fetchList: PropTypes.func.isRequired,
  };

  state = {
    shop: '',
    selected: '',
  };

  componentWillMount() {
    const { fetchList } = this.props;

    fetchList();
  }

  render() {
    const { entities } = this.props;
    const { shop, selected } = this.state;

    const filteredList = entities.filter(item => item.name.search(shop) !== -1);
    return (
      <React.Fragment>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Магазин"
            onChangeText={value => this.setState({ shop: value })}
            value={shop}
            style={styles.inputText}
          />
        </View>
        <ScrollView style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }}>
          {filteredList && filteredList.map(item => (
            <ShopItem key={item.id} data={item} c={selected === item.name} />
          ))}
        </ScrollView>
      </React.Fragment>
    );
  }
}
