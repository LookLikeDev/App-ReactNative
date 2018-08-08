import { connect } from 'react-redux';
import { moduleName as userModuleName } from '../../ducks/user';
import { moduleName as discountsModuleName } from '../../ducks/discounts';
import TabIcon from '../components/TabIcon';

const mapStateToProps = (state, ownProps) => {
  if (ownProps.type === 'favorites') {
    return { count: state[userModuleName].user.counter_looks_voted };
  }

  if (ownProps.type === 'discounts') {
    const dateViewed = state[userModuleName].getIn(['user', 'date_discounts_view']);
    const items = state[discountsModuleName].entities.toArray();

    if (items.length && dateViewed !== null) {
      const timestampViewed = dateViewed.toDate().getTime();
      const newItems = items.filter(item => item.date_issued.toDate().getTime() > timestampViewed);

      return { count: newItems.length };
    }

    return { count: 0 };
  }

  return {};
};

export default connect(mapStateToProps)(TabIcon);
