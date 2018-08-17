import { connect } from 'react-redux';
import DiscountsListScreen from '../../screens/DiscountsListScreen';
import { moduleName as discountsModule, updateList } from '../../../ducks/discounts';
import { moduleName as userModule } from '../../../ducks/user';

const mapStateToProps = state => ({
  initialed: state[discountsModule].get('initialed'),
  userId: state[userModule].get('id'),
});

const mapDispatchToProps = {
  updateList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(DiscountsListScreen);
