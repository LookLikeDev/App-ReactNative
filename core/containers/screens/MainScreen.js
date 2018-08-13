import { connect } from 'react-redux';
import MainScreen from '../../screens/MainScreen';
import { moduleName as looksModule, updateList } from '../../../ducks/looksGeneral';
import { moduleName as userModule } from '../../../ducks/user';

const mapStateToProps = state => ({
  initialed: state[looksModule].get('initialed'),
  likedLooks: state[userModule].getIn(['user', 'liked_looks']),
  dislikedLooks: state[userModule].getIn(['user', 'disliked_looks']),
});

const mapDispatchToProps = {
  updateList,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MainScreen);
