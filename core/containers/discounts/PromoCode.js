import { connect } from 'react-redux';
import { moduleName as discountsModule } from '../../../ducks/discounts';
import PromoCode from '../../components/Discounts/PromoCode';

const mapStateToProps = (state, ownProps) => ({
  data: state[discountsModule].entities.get(ownProps.discountId),
});

// TODO create selectors for entities
export default connect(mapStateToProps)(PromoCode);
