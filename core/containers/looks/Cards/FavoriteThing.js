import { connect } from 'react-redux';
import { addVote, moduleName as looksModule } from '../../../../ducks/favorites';
import { thingVote, moduleName as userModule } from '../../../../ducks/user';
import FavoriteThing from '../../../components/Looks/Cards/FavoriteThing';

const mapStateToProps = (state, ownProps) => {
  let isVoted = false;
  const isLike = Object.values(state[userModule].getIn(['user', 'liked_looks'])).some((item) => {
    if (item.items && item.items[ownProps.item.id]) {
      isVoted = true;
      return item.items[ownProps.item.id].isLiked;
    }
    return false;
  });

  return {
    voting: state[looksModule].voting,
    userId: state[userModule].id,
    isVoted,
    isLike,
  };
};

const mapDispatchToProps = {
  addVote,
  thingVote,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteThing);
