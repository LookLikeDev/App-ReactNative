import { connect } from 'react-redux';
import { addVote, moduleName as looksModule } from '../../../../ducks/favorites';
import { thingVote, moduleName as userModule } from '../../../../ducks/user';
import FavoriteThing from '../../../components/Looks/Cards/FavoriteThing';

const mapStateToProps = (state, ownProps) => {
  // console.log('HAS IN', state[userModule].user.liked_looks[ownProps.lookId].items[ownProps.id].isLiked);

  return {
    voting: state[looksModule].voting,
    userId: state[userModule].id,
    // isVoted: state[userModule].user.liked_looks[ownProps.lookId].items[ownProps.id].isLiked,
  };
};

const mapDispatchToProps = {
  addVote,
  thingVote,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteThing);
