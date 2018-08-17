import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import DiscountItem from './DiscountItem';

export default class DiscountsList extends React.Component {
  static propTypes = {
    // from connect
    userId: PropTypes.string.isRequired,
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
    setDiscountsViewDate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { setDiscountsViewDate } = this.props;

    setDiscountsViewDate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { setDiscountsViewDate, entities: currentEntities } = this.props;
    const { entities: prevEntities } = prevProps;

    if (currentEntities.length > prevEntities.length) setDiscountsViewDate();
  }

  render() {
    const { entities } = this.props;

    return (
      <ScrollView style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }}>
        {entities && entities.map(item => (
          <DiscountItem key={item.id} data={item} />
        ))}
      </ScrollView>
    );
  }
}
