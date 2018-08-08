import { connect } from 'react-redux';
import { setDiscountsViewDate, moduleName as userModule } from '../../../ducks/user';
import { moduleName as discountsModule } from '../../../ducks/discounts';
import DiscountsList from '../../components/Discounts/DiscountsList';

const mapStateToProps = state => ({
  loading: state[discountsModule].loading,
  loaded: state[discountsModule].loaded,
  userId: state[userModule].id,
  entities: state[discountsModule].entities.toArray(),
});

const mapDispatchToProps = {
  setDiscountsViewDate,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(DiscountsList);
