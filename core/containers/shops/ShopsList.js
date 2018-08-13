import { connect } from 'react-redux';
import { moduleName as userModule } from '../../../ducks/user';
import { fetchList, moduleName as shopsModule } from '../../../ducks/shops';
import ShopsList from '../../components/Shops/ShopsList';

const mapStateToProps = state => ({
  loading: state[shopsModule].loading,
  loaded: state[shopsModule].loaded,
  userId: state[userModule].id,
  entities: state[shopsModule].entities.toArray(),
});

const mapDispatchToProps = {
  fetchList,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(ShopsList);
