import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  View, ScrollView, TextInput, StyleSheet, ActivityIndicator,
} from 'react-native';
import Button from '../Common/Button';
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
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string,
      address: PropTypes.string,
    }).isRequired,
    fetchList: PropTypes.func.isRequired,
  };

  state = {
    input: '',
  };

  componentDidMount() {
    const { shop, fetchList, loaded } = this.props;

    this.setState({ input: shop.name === null ? '' : shop.name });
    if (!loaded) fetchList();
  }

  /**
   * @param {Object} shop
   */
  handleSelected = (shop) => {
    this.setState({ input: shop.name });
  };

  handleTextChange = (value) => {
    this.setState({ input: value });
  };

  handleSubmit = () => {
    const { entities } = this.props;
    const { input } = this.state;
    const shopIndex = entities.findIndex(item => input.toUpperCase() === item.name.toUpperCase());

    if (shopIndex !== -1) {
      Actions.publishLook({
        shop: {
          id: entities[shopIndex].id,
          name: entities[shopIndex].name,
          address: entities[shopIndex].address,
        },
      });
    } else {
      Actions.publishLook({ shop: { name: input } });
    }
  };

  render() {
    const { entities, loading } = this.props;
    const { input } = this.state;

    const filteredList = entities.filter((item) => {
      const string = item.name.toUpperCase();
      const searchStr = input.toUpperCase();

      return string.search(searchStr) !== -1;
    });

    return (
      <React.Fragment>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Магазин"
            onChangeText={this.handleTextChange}
            value={input}
            style={styles.inputText}
          />
        </View>
        {loading && (
          <ActivityIndicator animating size="large" style={{ marginTop: 26, alignSelf: 'stretch' }} />
        )}
        <ScrollView style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }}>
          {filteredList && filteredList.map(item => (
            <ShopItem
              key={item.id}
              data={item}
              selected={input.toUpperCase() === item.name.toUpperCase()}
              handleSelected={this.handleSelected}
            />
          ))}
        </ScrollView>
        <Button onPress={this.handleSubmit} title="Сохранить" borderLess />
      </React.Fragment>
    );
  }
}
