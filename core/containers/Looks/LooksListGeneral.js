import { connect } from 'react-redux';
import { like, dislike, moduleName as userModule } from '../../../ducks/user';
import {
  fetchList, itemRemove, moduleName as looksModule,
} from '../../../ducks/looksGeneral';
import LooksListGeneral from '../../components/Looks/LooksListGeneral';

const mapStateToProps = state => ({
  loading: state[looksModule].loading,
  loaded: state[looksModule].loaded,
  userId: state[userModule].id,
  likedLooks: state[userModule].user.liked_looks,
  dislikedLooks: state[userModule].user.disliked_looks,
  entities: state[looksModule].entities.toArray(),
});

const mapDispatchToProps = {
  fetchList,
  itemRemove,
  like,
  dislike,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(LooksListGeneral);
