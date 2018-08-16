import { connect } from 'react-redux';
import PhotoScreen from '../../screens/PhotoScreen';
import { moduleName, resetPublishStack } from '../../../ducks/publish';

const mapStateToProps = state => ({
  image: state[moduleName].get('image'),
});

const mapDispatchToProps = {
  resetPublishStack,
};


export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PhotoScreen);
