import { connect } from 'react-redux';
import LooksScreen from '../../screens/LooksScreen';
import { moduleName as looksModuleName, updateList } from '../../../ducks/looksUser';
import { moduleName as userModuleName } from '../../../ducks/user';

const mapStateToProps = state => ({
  initialed: state[looksModuleName].get('initialed'),
  userId: state[userModuleName].id,
});

const mapDispatchToProps = {
  updateList,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(LooksScreen);
