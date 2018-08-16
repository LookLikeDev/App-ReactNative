import { connect } from 'react-redux';
import { moduleName, addImage, resetPublishStack } from '../../../ducks/publish';
import CameraScreen from '../../screens/CameraScreen';

const mapStateToProps = state => ({
  image: state[moduleName].get('image'),
});

const mapDispatchToProps = {
  addImage,
  resetPublishStack,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CameraScreen);
