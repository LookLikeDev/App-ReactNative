import { connect } from 'react-redux';
import FavoritesScreen from '../../screens/FavoritesScreen';
import { moduleName as userModule, resetFavoritesCounter } from '../../../ducks/user';
import { moduleName as favoritesModule, updateList } from '../../../ducks/favorites';

const mapStateToProps = state => ({
  likedLooks: state[userModule].getIn(['user', 'liked_looks']),
  initialed: state[favoritesModule].get('initialed'),
});

const mapDispatchToProps = {
  resetFavoritesCounter,
  updateList,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(FavoritesScreen);
