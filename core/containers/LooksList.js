import { connect } from 'react-redux';
import { moduleName, fetchList } from '../../ducks/looks';
import LooksList from '../components/Looks/LooksList';

const mapStateToProps = state => ({
  loading: state[moduleName].loading,
  loaded: state[moduleName].loaded,
  entities: state[moduleName].entities.toArray(),
});

const mapDispatchToProps = {
  fetchList,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(LooksList);
