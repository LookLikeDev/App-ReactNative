import { connect } from 'react-redux';
import { moduleName } from '../../ducks/user';
import Badge from '../components/TabIcon/Badge';

export default connect(state => ({
  count: state[moduleName].user.counter_looks_voted,
}))(Badge);
