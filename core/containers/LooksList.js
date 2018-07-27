import { connect } from 'react-redux';
import { moduleName as authModule } from '../../ducks/auth';
import { fetchList, moduleName as looksModule } from '../../ducks/looks';
import LooksList from '../components/Looks/LooksList';

const mapStateToProps = state => ({
  loading: state[looksModule].loading,
  loaded: state[looksModule].loaded,
  id: state[authModule].id,
  entities: state[looksModule].entities.toArray(),
});

const mapDispatchToProps = {
  fetchList,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(LooksList);
