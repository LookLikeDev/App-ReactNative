import { connect } from 'react-redux';
import { moduleName as discountsModule } from '../../../../ducks/discounts';
import UserThing from '../../../components/Looks/Cards/UserThing';

const mapStateToProps = (state, ownProps) => {
  if (ownProps.is_discount_reached) {
    console.log(ownProps);
    return {
      discountId: state[discountsModule].entities.find(item => item.item.id === ownProps.id).get('id'),
    };
  }

  return {};
};

// TODO create selectors for entities
export default connect(mapStateToProps)(UserThing);
