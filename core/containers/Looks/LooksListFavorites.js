import { connect } from 'react-redux';
import { resetFavoritesCounter, moduleName as userModule } from '../../../ducks/user';
import {
  fetchList, moduleName as looksModule,
} from '../../../ducks/favorites';
import LooksListFavorites from '../../components/Looks/LooksListFavorites';

const mapStateToProps = state => ({
  loading: state[looksModule].loading,
  loaded: state[looksModule].loaded,
  userId: state[userModule].id,
  likedLooks: state[userModule].user.liked_looks,
  entities: state[looksModule].entities.toArray(),
});

const mapDispatchToProps = {
  fetchList,
  resetFavoritesCounter,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(LooksListFavorites);
