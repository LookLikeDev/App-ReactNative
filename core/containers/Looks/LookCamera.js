import { connect } from 'react-redux';
import { moduleName, addImage, addThing, removeThing } from '../../../ducks/publish';
import LookCamera from '../../components/Looks/LookCamera';

const mapStateToProps = state => ({
  image: state[moduleName].image,
  things: state[moduleName].things.toArray(),
});

const mapDispatchToProps = {
  addImage,
  addThing,
  removeThing,
};

// TODO create selectors for entities
export default connect(mapStateToProps, mapDispatchToProps)(LookCamera);
