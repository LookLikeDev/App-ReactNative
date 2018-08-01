import { connect } from 'react-redux';
import { moduleName } from '../../ducks/user';
import TabIcon from '../components/TabIcon';

const mapStateToProps = state => ({
  count: state[moduleName].user.counter_looks_voted,
});

export default connect(mapStateToProps)(TabIcon);
