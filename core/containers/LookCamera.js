import { connect } from 'react-redux';
import { moduleName, addImage } from '../../ducks/looksGeneral';
import LookCamera from '../components/Looks/LookCamera';

const mapStateToProps = state => ({
  image: state[moduleName].image,
});

const mapDispatchToProps = {
  addImage,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(LookCamera);
